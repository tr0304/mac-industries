/* Mac Industries - interactive store map (Leaflet + OpenStreetMap)
   Shows the store with a marker and popup. The visitor can zoom and drag the map,
   put it back on the store, or open directions in Google Maps. */

(function () {
    'use strict';

    var mapElement = document.getElementById('map');
    if (!mapElement) { return; }

    var statusText = document.getElementById('map-status');
    var resetButton = document.getElementById('reset-btn');

    function say(message) {
        if (statusText) { statusText.textContent = message; }
    }

    // If the Leaflet library did not load (for example the visitor is offline),
    // show a friendly message instead of a broken box.
    if (typeof L === 'undefined') {
        mapElement.innerHTML = '<p class="map-fallback">The interactive map could not be loaded. ' +
            'Please use the "Open in Google Maps" button below instead.</p>';
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

    /* Reset button: put the map back on the store */
    if (resetButton) {
        resetButton.addEventListener('click', function () {
            map.setView(STORE, START_ZOOM);
            storeMarker.openPopup();
            say('');
        });
    }
})();
