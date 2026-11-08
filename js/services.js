/* Mac Industries - Services page: product list with search, filter and sort
   The product cards are built with JavaScript from the PRODUCTS list in products.js.
   Typing in the search box, clicking a category button or changing the sort order
   rebuilds the list straight away without reloading the page. */

(function () {
    'use strict';

    if (typeof PRODUCTS === 'undefined') { return; }

    var grid = document.getElementById('product-grid');
    var searchInput = document.getElementById('product-search');
    var sortSelect = document.getElementById('product-sort');
    var filterGroup = document.getElementById('category-filters');
    var countText = document.getElementById('product-count');
    var clearButton = document.getElementById('clear-filters');
    if (!grid || !searchInput || !sortSelect || !filterGroup) { return; }

    var CATEGORIES = ['All', 'Consoles', 'Games', 'Accessories'];
    var state = { query: '', category: 'All', sort: 'featured' };
    var firstRender = true;

    /* ---------- build one product card with DOM methods ---------- */
    function makeElement(tag, className, text) {
        var element = document.createElement(tag);
        if (className) { element.className = className; }
        if (text) { element.textContent = text; }
        return element;
    }

    function buildCard(product) {
        var stem = product.image.replace(/\.[^.]+$/, '');              // ps5-console
        var extension = product.image.slice(stem.length);              // .jpg
        var folder = '../_images/';

        var card = makeElement('article', 'card');
        if (!firstRender) { card.classList.add('card-enter'); }        // fade new cards in after a search or sort

        var img = document.createElement('img');
        img.src = folder + product.image;
        img.srcset = folder + 'responsive/' + stem + '-480w' + extension + ' 480w, ' +
                     folder + 'responsive/' + stem + '-800w' + extension + ' 800w';
        img.sizes = '(min-width: 64em) 22rem, (min-width: 40em) 30vw, calc(100vw - 4.5rem)';
        img.alt = product.alt;
        img.loading = 'lazy';
        if (product.portrait) { img.className = 'portrait'; }
        card.appendChild(img);

        card.appendChild(makeElement('h3', '', product.name));
        card.appendChild(makeElement('p', 'price', product.priceLabel));
        if (product.note) { card.appendChild(makeElement('p', 'note', product.note)); }
        if (product.description) { card.appendChild(makeElement('p', '', product.description)); }

        var enquire = makeElement('a', 'btn', 'Enquire');
        enquire.href = 'enquiry.html?product=' + encodeURIComponent(product.name);
        enquire.setAttribute('aria-label', 'Enquire about ' + product.name);
        card.appendChild(enquire);

        return card;
    }

    /* ---------- search + filter + sort ---------- */
    function matchesSearch(product, query) {
        if (!query) { return true; }
        var text = (product.name + ' ' + product.category + ' ' + product.platform + ' ' +
                    product.note + ' ' + product.description).toLowerCase();
        // every word typed must appear somewhere ("ps5 game" finds the PS5 games)
        return query.toLowerCase().split(/\s+/).every(function (word) {
            return text.indexOf(word) !== -1;
        });
    }

    function getVisibleProducts() {
        var list = PRODUCTS.filter(function (product) {
            var inCategory = state.category === 'All' || product.category === state.category;
            return inCategory && matchesSearch(product, state.query.trim());
        });

        if (state.sort === 'price-asc') {
            list.sort(function (a, b) { return a.price - b.price; });
        } else if (state.sort === 'price-desc') {
            list.sort(function (a, b) { return b.price - a.price; });
        } else if (state.sort === 'name-asc') {
            list.sort(function (a, b) { return a.name.localeCompare(b.name); });
        }
        return list;                                                    // "featured" keeps the order in products.js
    }

    function render() {
        var list = getVisibleProducts();
        grid.innerHTML = '';

        if (list.length === 0) {
            var empty = makeElement('div', 'no-results');
            empty.appendChild(makeElement('p', '', 'No products match your search. Try a different word or clear the filters.'));
            grid.appendChild(empty);
        } else {
            list.forEach(function (product) { grid.appendChild(buildCard(product)); });
        }

        var message = 'Showing ' + list.length + ' of ' + PRODUCTS.length + ' products';
        if (state.category !== 'All') { message += ' in ' + state.category; }
        if (state.query.trim()) { message += ' matching "' + state.query.trim() + '"'; }
        countText.textContent = message;

        // show the clear button only when something is filtered
        clearButton.hidden = (state.category === 'All' && !state.query.trim() && state.sort === 'featured');

        // highlight the active category button
        Array.prototype.forEach.call(filterGroup.querySelectorAll('.chip'), function (chip) {
            chip.setAttribute('aria-pressed', chip.dataset.category === state.category ? 'true' : 'false');
        });

        firstRender = false;
    }

    /* ---------- category buttons ---------- */
    CATEGORIES.forEach(function (category) {
        var total = category === 'All' ? PRODUCTS.length : PRODUCTS.filter(function (p) { return p.category === category; }).length;
        var chip = makeElement('button', 'chip', category + ' (' + total + ')');
        chip.type = 'button';
        chip.dataset.category = category;
        chip.setAttribute('aria-pressed', 'false');
        chip.addEventListener('click', function () {
            state.category = category;
            render();
        });
        filterGroup.appendChild(chip);
    });

    /* ---------- search box, sort menu, clear button ---------- */
    searchInput.addEventListener('input', function () {
        state.query = searchInput.value;
        render();
    });

    sortSelect.addEventListener('change', function () {
        state.sort = sortSelect.value;
        render();
    });

    clearButton.addEventListener('click', function () {
        state = { query: '', category: 'All', sort: 'featured' };
        searchInput.value = '';
        sortSelect.value = 'featured';
        render();
        searchInput.focus();
    });

    render();
})();
