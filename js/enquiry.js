/* Mac Industries - Enquiry form
   1. Fills the product menu from the PRODUCTS list (products.js).
   2. Validates every field in the browser and shows a clear message under any field that is wrong.
   3. Sends the enquiry with fetch() (AJAX) without reloading the page.
   4. Shows a response with the estimated cost, availability and delivery information. */

(function () {
    'use strict';

    var form = document.getElementById('enquiry-form');
    if (!form || typeof PRODUCTS === 'undefined') { return; }

    /* The enquiry is posted here. JSONPlaceholder is a free testing service that accepts
       a POST request and replies with success, but it does not store or email anything.
       To receive real enquiries, replace this address with your own form service
       (for example a Formspree address). */
    var ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';

    var formSection = document.getElementById('enquiry-form-section');
    var responseBox = document.getElementById('enquiry-response');
    var summary = document.getElementById('form-summary');
    var submitButton = document.getElementById('submit-btn');
    var productSelect = document.getElementById('product');
    var messageBox = document.getElementById('message');
    var messageCount = document.getElementById('message-count');

    /* ---------- 1. product menu (and pre-selection from ?product=) ---------- */
    PRODUCTS.forEach(function (product) {
        var option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name + ' (' + product.priceLabel + ')';
        productSelect.appendChild(option);
    });

    var wanted = new URLSearchParams(window.location.search).get('product');
    if (wanted) {
        PRODUCTS.forEach(function (product) {
            if (product.name === wanted) { productSelect.value = product.id; }
        });
    }

    function findProduct(id) {
        return PRODUCTS.filter(function (p) { return p.id === id; })[0];
    }

    /* ---------- 2. validation ---------- */
    function value(id) { return document.getElementById(id).value.trim(); }

    function checkedTopics() {
        return Array.prototype.slice.call(form.querySelectorAll('input[name="topics"]:checked'))
            .map(function (box) { return box.value; });
    }

    function contactMethod() {
        return form.querySelector('input[name="contactMethod"]:checked').value;
    }

    // Each rule returns an error message, or an empty string when the field is fine.
    var rules = {
        name: function () {
            var v = value('name');
            if (!v) { return 'Please enter your full name.'; }
            if (v.length < 2) { return 'Your name must be at least 2 characters long.'; }
            if (!/^[\p{L}][\p{L} '\-]*$/u.test(v)) { return 'Your name can only contain letters, spaces, hyphens and apostrophes.'; }
            return '';
        },
        email: function () {
            var v = value('email');
            if (!v) { return 'Please enter your email address.'; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { return 'Enter a valid email address, like name@example.com.'; }
            return '';
        },
        phone: function () {
            var v = value('phone');
            if (!v) { return contactMethod() === 'Phone' ? 'Please enter a phone number, because you chose to be contacted by phone.' : ''; }
            var digits = v.replace(/[\s\-()]/g, '');
            if (!/^(\+27|0)\d{9}$/.test(digits)) { return 'Enter a South African number, like 082 123 4567 or +27 82 123 4567.'; }
            return '';
        },
        product: function () {
            return value('product') ? '' : 'Please choose the product you are asking about.';
        },
        quantity: function () {
            var v = value('quantity');
            if (!v) { return 'Please enter how many you want.'; }
            if (!/^\d+$/.test(v) || Number(v) < 1 || Number(v) > 10) { return 'Quantity must be a whole number from 1 to 10.'; }
            return '';
        },
        topics: function () {
            return checkedTopics().length ? '' : 'Please tick at least one thing you would like to know.';
        },
        message: function () {
            var v = value('message');
            if (!v) { return 'Please type your question.'; }
            if (v.length < 10) { return 'Please give us a little more detail (at least 10 characters).'; }
            if (v.length > 500) { return 'Please keep your message under 500 characters.'; }
            return '';
        }
    };

    function showError(name, message) {
        var errorBox = document.getElementById(name + '-error');
        errorBox.textContent = message;
        var control = document.getElementById(name);
        if (control) { control.setAttribute('aria-invalid', message ? 'true' : 'false'); }
        errorBox.parentNode.classList.toggle('has-error', Boolean(message));
    }

    function validateField(name) {
        var message = rules[name]();
        showError(name, message);
        return message === '';
    }

    // Check a field when the visitor leaves it, and keep checking as they correct it.
    var touched = {};
    ['name', 'email', 'phone', 'quantity', 'message'].forEach(function (name) {
        var control = document.getElementById(name);
        control.addEventListener('blur', function () { touched[name] = true; validateField(name); });
        control.addEventListener('input', function () { if (touched[name]) { validateField(name); } });
    });

    productSelect.addEventListener('change', function () { validateField('product'); });
    Array.prototype.forEach.call(form.querySelectorAll('input[name="topics"]'), function (box) {
        box.addEventListener('change', function () { validateField('topics'); });
    });
    Array.prototype.forEach.call(form.querySelectorAll('input[name="contactMethod"]'), function (radio) {
        radio.addEventListener('change', function () { if (touched.phone || value('phone')) { validateField('phone'); } });
    });

    messageBox.addEventListener('input', function () {
        messageCount.textContent = messageBox.value.length + ' / 500';
    });

    /* ---------- 3. send the enquiry (AJAX) ---------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var failed = Object.keys(rules).filter(function (name) { return !validateField(name); });

        if (failed.length > 0) {
            summary.textContent = failed.length === 1
                ? 'Please fix the 1 problem marked below.'
                : 'Please fix the ' + failed.length + ' problems marked below.';
            summary.hidden = false;
            var firstBad = document.getElementById(failed[0]) || form.querySelector('input[name="' + failed[0] + '"]');
            firstBad.focus();
            return;
        }

        summary.hidden = true;

        var product = findProduct(value('product'));
        var enquiry = {
            name: value('name'),
            email: value('email'),
            phone: value('phone'),
            product: product.name,
            quantity: Number(value('quantity')),
            topics: checkedTopics(),
            contactMethod: contactMethod(),
            message: value('message')
        };

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        var controller = new AbortController();
        var timer = window.setTimeout(function () { controller.abort(); }, 10000);

        fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(enquiry),
            signal: controller.signal
        }).then(function (reply) {
            if (!reply.ok) { throw new Error('Server replied ' + reply.status); }
            return reply.json();
        }).then(function () {
            showResponse(enquiry, product);
        }).catch(function () {
            summary.textContent = 'Sorry, we could not send your enquiry. Please check your internet connection and try again.';
            summary.hidden = false;
            summary.scrollIntoView({ block: 'center' });
        }).then(function () {
            window.clearTimeout(timer);
            submitButton.disabled = false;
            submitButton.textContent = 'Send enquiry';
        });
    });

    /* ---------- 4. the response ---------- */
    function add(parent, tag, text, className) {
        var element = document.createElement(tag);
        element.textContent = text;
        if (className) { element.className = className; }
        parent.appendChild(element);
        return element;
    }

    function money(amount) { return 'R' + amount; }

    function showResponse(enquiry, product) {
        var reference = 'MAC-' + Date.now().toString(36).toUpperCase();
        var qty = enquiry.quantity;
        var isFrom = /^from/i.test(product.priceLabel);
        var wantsPrice = enquiry.topics.indexOf('Price') !== -1;
        var wantsStock = enquiry.topics.indexOf('Availability') !== -1;
        var wantsDelivery = enquiry.topics.indexOf('Delivery') !== -1;

        responseBox.innerHTML = '';
        add(responseBox, 'h2', 'Thank you, ' + enquiry.name.split(' ')[0] + '!');
        add(responseBox, 'p', 'We have received your enquiry. Your reference number is ' + reference + '.');

        var list = document.createElement('ul');
        list.className = 'response-list';
        add(list, 'li', 'Product: ' + product.name + ' x ' + qty);

        if (wantsPrice) {
            var total = money(product.price * qty);
            add(list, 'li', 'Estimated cost: ' + product.priceLabel + ' each, so ' + (isFrom ? 'from ' : '') + total +
                ' for ' + qty + (isFrom ? '. The final price depends on the controller you choose.' : '.'));
        }

        if (wantsStock) {
            var stockMessage;
            if (product.stock === 0) {
                stockMessage = 'Currently out of stock. We will tell you as soon as it arrives.';
            } else if (qty > product.stock) {
                stockMessage = 'We only have ' + product.stock + ' in stock, so we cannot supply all ' + qty +
                    ' straight away. Our team will contact you about the rest.';
            } else if (product.stock <= 3) {
                stockMessage = 'In stock, but only ' + product.stock + ' left. Order soon!';
            } else {
                stockMessage = 'In stock. We have ' + product.stock + ' available.';
            }
            add(list, 'li', 'Availability: ' + stockMessage);
        }

        if (wantsDelivery) {
            add(list, 'li', 'Delivery: we deliver nationwide. Our team will confirm the delivery time and cost when they contact you. Returns are guaranteed for up to 60 days after purchase.');
        }
        responseBox.appendChild(list);

        var how = enquiry.contactMethod === 'Phone' ? 'on ' + enquiry.phone : 'at ' + enquiry.email;
        add(responseBox, 'p', 'A member of our team will contact you ' + how + ' to answer your question.');

        var again = add(responseBox, 'button', 'Make another enquiry', 'btn btn-outline');
        again.type = 'button';
        again.addEventListener('click', resetForm);

        formSection.hidden = true;
        responseBox.classList.remove('reveal', 'is-visible');   // show straight away, without the scroll fade-in
        responseBox.hidden = false;
        responseBox.focus();
        responseBox.scrollIntoView({ block: 'start' });
    }

    function resetForm() {
        form.reset();
        touched = {};
        Object.keys(rules).forEach(function (name) { showError(name, ''); });
        messageCount.textContent = '0 / 500';
        summary.hidden = true;
        responseBox.hidden = true;
        formSection.classList.remove('reveal', 'is-visible');
        formSection.hidden = false;
        document.getElementById('name').focus();
    }
})();
