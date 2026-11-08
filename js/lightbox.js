/* Mac Industries - gallery lightbox
   Click (or press Enter on) a gallery image to view it larger.
   Close with the X button, the Escape key or by clicking the dark background.
   Move between images with the arrow buttons, the left/right arrow keys or by swiping. */

(function () {
    'use strict';

    var grid = document.querySelector('.gallery-grid');
    if (!grid) { return; }

    var items = [];          // one entry per gallery image
    var current = 0;         // index of the image being shown
    var lastFocused = null;  // the button that opened the lightbox
    var touchStartX = null;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* 1. Turn every gallery image into a button so keyboard users can open it too */
    Array.prototype.forEach.call(grid.querySelectorAll('figure'), function (figure) {
        var img = figure.querySelector('img');
        if (!img) { return; }

        var figcaption = figure.querySelector('figcaption');
        var captionText = figcaption ? figcaption.textContent.trim() : img.alt;

        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'lightbox-trigger';
        button.setAttribute('aria-label', 'View larger image: ' + captionText);
        img.parentNode.insertBefore(button, img);
        button.appendChild(img);

        var index = items.length;
        items.push({ src: img.getAttribute('src'), alt: img.alt, caption: captionText, button: button });
        button.addEventListener('click', function () { openLightbox(index); });
    });

    if (items.length === 0) { return; }

    /* 2. Build the lightbox once and keep it hidden until needed */
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.hidden = true;
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Image viewer');
    box.innerHTML =
        '<button type="button" class="lb-btn lb-close" aria-label="Close image viewer">&times;</button>' +
        '<button type="button" class="lb-btn lb-prev" aria-label="Previous image">&#8249;</button>' +
        '<figure class="lb-figure">' +
            '<img class="lb-img" src="" alt="">' +
            '<figcaption class="lb-caption"></figcaption>' +
            '<p class="lb-count" aria-live="polite"></p>' +
        '</figure>' +
        '<button type="button" class="lb-btn lb-next" aria-label="Next image">&#8250;</button>';
    document.body.appendChild(box);

    var bigImg = box.querySelector('.lb-img');
    var caption = box.querySelector('.lb-caption');
    var count = box.querySelector('.lb-count');
    var closeBtn = box.querySelector('.lb-close');
    var prevBtn = box.querySelector('.lb-prev');
    var nextBtn = box.querySelector('.lb-next');

    /* 3. Show one image */
    function showImage(index) {
        current = (index + items.length) % items.length;   // wraps round at both ends
        var item = items[current];

        bigImg.classList.add('is-loading');
        bigImg.onload = function () { bigImg.classList.remove('is-loading'); };
        bigImg.onerror = function () {
            bigImg.classList.remove('is-loading');
            caption.textContent = 'Sorry, this image could not be loaded.';
        };
        bigImg.src = item.src;
        bigImg.alt = item.alt;
        caption.textContent = item.caption;
        count.textContent = 'Image ' + (current + 1) + ' of ' + items.length;

        // load the neighbouring images in the background so arrows feel instant
        [current - 1, current + 1].forEach(function (n) {
            var preload = new Image();
            preload.src = items[(n + items.length) % items.length].src;
        });
    }

    function openLightbox(index) {
        lastFocused = document.activeElement;
        showImage(index);
        box.hidden = false;
        document.body.classList.add('lightbox-open');
        // wait one frame so the fade-in transition runs
        window.requestAnimationFrame(function () { box.classList.add('is-open'); });
        closeBtn.focus();
    }

    function closeLightbox() {
        box.classList.remove('is-open');
        document.body.classList.remove('lightbox-open');
        window.setTimeout(function () {
            box.hidden = true;
            bigImg.removeAttribute('src');
        }, reduceMotion ? 0 : 200);
        if (lastFocused) { lastFocused.focus(); }   // hand focus back to the image that was clicked
    }

    /* 4. Buttons, backdrop click, keyboard and swipe */
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', function () { showImage(current - 1); });
    nextBtn.addEventListener('click', function () { showImage(current + 1); });

    box.addEventListener('click', function (event) {
        if (event.target === box) { closeLightbox(); }   // only the dark area, not the picture
    });

    document.addEventListener('keydown', function (event) {
        if (box.hidden) { return; }

        if (event.key === 'Escape') { closeLightbox(); }
        else if (event.key === 'ArrowLeft') { showImage(current - 1); }
        else if (event.key === 'ArrowRight') { showImage(current + 1); }
        else if (event.key === 'Tab') {
            // keep Tab inside the lightbox while it is open
            var focusable = [closeBtn, prevBtn, nextBtn];
            var first = focusable[0];
            var last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
    });

    box.addEventListener('touchstart', function (event) {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    box.addEventListener('touchend', function (event) {
        if (touchStartX === null) { return; }
        var distance = event.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(distance) > 50) {                    // a swipe, not a tap
            showImage(distance < 0 ? current + 1 : current - 1);
        }
    }, { passive: true });
})();
