/* Mac Industries - Contact form
   1. Checks every field and shows a message under any field that is wrong.
   2. Builds an email from what the visitor typed.
   3. Opens it in their email app, addressed to our email address. */

// The email address that receives the messages
var STORE_EMAIL = 'macindustriesDigital@gmail.com';

var form = document.getElementById('contact-form');
var summary = document.getElementById('contact-summary');
var confirmBox = document.getElementById('contact-confirm');

// ---------- helper functions ----------

// show (or clear) an error message under a field
function showError(fieldName, message) {
    var errorBox = document.getElementById(fieldName + '-error');
    var field = document.getElementById(fieldName);
    errorBox.textContent = message;
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
}

// each check returns an error message, or '' if the field is fine
function checkName() {
    var name = document.getElementById('contact-name').value.trim();
    if (name === '') { return 'Please enter your name.'; }
    if (name.length < 2) { return 'Your name must be at least 2 characters.'; }
    if (/[0-9]/.test(name)) { return 'Your name cannot contain numbers.'; }
    return '';
}

function checkEmail() {
    var email = document.getElementById('contact-email').value.trim();
    if (email === '') { return 'Please enter your email address.'; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { return 'Enter a valid email address, like name@example.com.'; }
    return '';
}

function checkTopic() {
    if (document.getElementById('contact-topic').value === '') { return 'Please choose what your message is about.'; }
    return '';
}

function checkMessage() {
    var message = document.getElementById('contact-message').value.trim();
    if (message === '') { return 'Please type your message.'; }
    if (message.length < 10) { return 'Your message must be at least 10 characters.'; }
    if (message.length > 500) { return 'Your message must be 500 characters or less.'; }
    return '';
}

// run one check and show its result; returns true if the field is fine
function validate(fieldName, checkFunction) {
    var message = checkFunction();
    showError(fieldName, message);
    return message === '';
}

// ---------- check fields as the visitor fills them in ----------
document.getElementById('contact-name').addEventListener('blur', function () { validate('contact-name', checkName); });
document.getElementById('contact-email').addEventListener('blur', function () { validate('contact-email', checkEmail); });
document.getElementById('contact-topic').addEventListener('change', function () { validate('contact-topic', checkTopic); });
document.getElementById('contact-message').addEventListener('blur', function () { validate('contact-message', checkMessage); });

// live counter under the message box
document.getElementById('contact-message').addEventListener('input', function () {
    document.getElementById('contact-count').textContent = this.value.length + ' / 500';
});

// ---------- when the form is sent ----------
form.addEventListener('submit', function (event) {
    event.preventDefault();   // stop the page reloading

    // run all four checks
    var nameOk = validate('contact-name', checkName);
    var emailOk = validate('contact-email', checkEmail);
    var topicOk = validate('contact-topic', checkTopic);
    var messageOk = validate('contact-message', checkMessage);

    if (!(nameOk && emailOk && topicOk && messageOk)) {
        summary.textContent = 'Please fix the problems marked below.';
        summary.hidden = false;
        return;
    }
    summary.hidden = true;

    // collect what the visitor typed
    var name = document.getElementById('contact-name').value.trim();
    var email = document.getElementById('contact-email').value.trim();
    var topic = document.getElementById('contact-topic').value;
    var message = document.getElementById('contact-message').value.trim();

    // build the email
    var subject = 'Mac Industries contact: ' + topic + ' - ' + name;
    var body = 'Name: ' + name + '\n' +
               'Email: ' + email + '\n' +
               'Topic: ' + topic + '\n\n' +
               message;

    var link = 'mailto:' + STORE_EMAIL + '?subject=' + encodeURIComponent(subject);
    link += '&body=' + encodeURIComponent(body);

    // show the confirmation (no page reload)
    document.getElementById('confirm-name').textContent = name;
    document.getElementById('confirm-to').textContent = STORE_EMAIL;
    document.getElementById('confirm-subject').textContent = subject;
    document.getElementById('confirm-link').href = link;
    form.hidden = true;
    confirmBox.hidden = false;
    confirmBox.focus();

    // open the visitor's email app with the message ready to send
    window.location.href = link;
});

// "Write another message" button
document.getElementById('contact-again').addEventListener('click', function () {
    form.reset();
    document.getElementById('contact-count').textContent = '0 / 500';
    ['contact-name', 'contact-email', 'contact-topic', 'contact-message'].forEach(function (id) { showError(id, ''); });
    confirmBox.hidden = true;
    form.hidden = false;
    document.getElementById('contact-name').focus();
});
