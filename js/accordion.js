/* Mac Industries - FAQ accordion
   Click a question to open its answer. Opening one closes the others.
   Works with the keyboard too: Enter or Space to toggle, Up/Down arrows to move
   between questions, Home and End to jump to the first or last one. */

(function () {
    'use strict';

    var accordion = document.querySelector('.accordion');
    if (!accordion) { return; }

    var triggers = Array.prototype.slice.call(accordion.querySelectorAll('.accordion-trigger'));

    // Only collapse the answers once the script is running,
    // so the answers are still readable if JavaScript is switched off.
    accordion.classList.add('accordion-enabled');

    function setOpen(trigger, open) {
        var panel = document.getElementById(trigger.getAttribute('aria-controls'));
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.classList.toggle('is-open', open);
    }

    triggers.forEach(function (trigger, index) {
        setOpen(trigger, false);

        trigger.addEventListener('click', function () {
            var willOpen = trigger.getAttribute('aria-expanded') !== 'true';
            triggers.forEach(function (other) { setOpen(other, false); });   // close all
            setOpen(trigger, willOpen);                                        // then open the clicked one
        });

        trigger.addEventListener('keydown', function (event) {
            var target = null;
            if (event.key === 'ArrowDown') { target = triggers[(index + 1) % triggers.length]; }
            else if (event.key === 'ArrowUp') { target = triggers[(index - 1 + triggers.length) % triggers.length]; }
            else if (event.key === 'Home') { target = triggers[0]; }
            else if (event.key === 'End') { target = triggers[triggers.length - 1]; }

            if (target) {
                event.preventDefault();
                target.focus();
            }
        });
    });
})();
