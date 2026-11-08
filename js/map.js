/* Mac Industries - interactive store map (Leaflet + OpenStreetMap)
   Shows the store with a marker and popup. The visitor can zoom and drag the map,
   find out how far away they are, or open directions in Google Maps. */

(function () {
    'use strict';

    var mapElement = document.getElementById('map');
    if (!mapElement) { return; }

    var statusText = document.getElementById('map-status');
    var locateButton = document.getElementById('locate-btn');
    var resetButton = document.getElementById('reset-btn');

    function say(message) {
        if (statusText) { statusText.textContent = message; }
    }

    // If the Leaflet library did not load (for example the visitor is offline),
    // show a friendly message instead of a broken box.
    if (typeof L === 'undefined') {
        mapElement.innerHTML = '<p class="map-fallback">The interactive map could not be loaded. ' +
            'Please use the "Open in Google Maps" button below instead.</p>';
        if (locateButton) { locateButton.disabled = true; }
        if (resetButton) { resetButton.disabled = true; }
        return;
    }

    // Approximate location of the store (Westville, Durban). The business is not real.
    var STORE = [-29.8333, 30.9167];
    var START_ZOOM = 14;

    var map = L.map(mapElement, { scrollWheelZoom: false }).setView(STORE, START_ZOOM);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.control.scale({ imperial: false }).addTo(map);

    var storeMarker = L.marker(STORE, {
        title: 'Mac Industries store',
        alt: 'Mac Industries store location'
    }).addTo(map);

    storeMarker.bindPopup(
        '<strong>Mac Industries</strong><br>Westville, Durban<br>' +
        '<a href="https://www.google.com/maps/dir/?api=1&destination=' + STORE[0] + ',' + STORE[1] +
        '" target="_blank" rel="noopener">Get directions</a>'
    ).openPopup();

    // Scrolling the page should not zoom the map by accident:
    // the mouse wheel only zooms once the map has been clicked or focused.
    map.on('focus', function () { map.scrollWheelZoom.enable(); });
    map.on('blur', function () { map.scrollWheelZoom.disable(); });

    var visitorLayer = null;

    function removeVisitor() {
        if (visitorLayer) {
            map.removeLayer(visitorLayer);
            visitorLayer = null;
        }
    }

    /* Button 1: find the visitor and show the distance to the store */
    if (locateButton) {
        locateButton.addEventListener('click', function () {
            if (!navigator.geolocation) {
                say('Sorry, your browser does not support finding your location.');
                return;
            }

            say('Finding your location...');
            locateButton.disabled = true;

            navigator.geolocation.getCurrentPosition(function (position) {
                var visitor = [position.coords.latitude, position.coords.longitude];

                removeVisitor();
                visitorLayer = L.layerGroup([
                    L.circleMarker(visitor, {
                        radius: 8, color: '#FFFFFF', weight: 2, fillColor: '#2A5FD6', fillOpacity: 1
                    }).bindPopup('You are here'),
                    L.polyline([visitor, STORE], { color: '#2A5FD6', weight: 3, dashArray: '6 8' })
                ]).addTo(map);

                map.fitBounds(L.latLngBounds([visitor, STORE]), { padding: [40, 40] });

                var kilometres = map.distance(visitor, STORE) / 1000;
                say('You are about ' + kilometres.toFixed(1) + ' km from our store (in a straight line).');
                locateButton.disabled = false;
            }, function (error) {
                if (error.code === 1) {
                    say('Location access was blocked. Allow location in your browser to see how far away you are.');
                } else if (error.code === 3) {
                    say('Finding your location took too long. Please try again.');
                } else {
                    say('Sorry, we could not work out your location.');
                }
                locateButton.disabled = false;
            }, { timeout: 10000 });
        });
    }

    /* Button 2: put the map back on the store */
    if (resetButton) {
        resetButton.addEventListener('click', function () {
            removeVisitor();
            map.setView(STORE, START_ZOOM);
            storeMarker.openPopup();
            say('');
        });
    }
})();
