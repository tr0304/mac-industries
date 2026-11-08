/* Mac Industries - scroll animations
   Sections, product cards and gallery images fade and slide up
   the first time they scroll into view. Switched off automatically for
   visitors who have "reduce motion" turned on in their device settings. */

(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) { return; }

    var targets = document.querySelectorAll('main > section, .card, .gallery-grid figure, .banner');
    if (targets.length === 0) { return; }

    // hide the targets first (CSS), then reveal each one as it appears on screen
    document.documentElement.classList.add('js-animations');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) { return; }

            var element = entry.target;
            observer.unobserve(element);   // animate once only

            // small delay between neighbouring cards so they appear one after another
            var siblings = Array.prototype.slice.call(element.parentNode.children);
            var position = siblings.indexOf(element);
            element.style.transitionDelay = Math.min(position, 5) * 80 + 'ms';

            element.classList.add('is-visible');

            // once finished, remove the helper classes so the element's normal hover styles take over again
            window.setTimeout(function () {
                element.classList.remove('reveal', 'is-visible');
                element.style.transitionDelay = '';
            }, 1200);
        });
    }, { threshold: 0.12 });

    Array.prototype.forEach.call(targets, function (element) {
        element.classList.add('reveal');
        observer.observe(element);
    });
})();
