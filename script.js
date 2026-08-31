(function () {
  // Dynamic "Last login" terminal line
  var loginEl = document.getElementById('last-login');
  if (loginEl) {
    var now = new Date();
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var hh = String(now.getHours()).padStart(2, '0');
    var mm = String(now.getMinutes()).padStart(2, '0');
    var stamp = days[now.getDay()] + ' ' + months[now.getMonth()] + ' ' + String(now.getDate()).padStart(2, '0') +
      ' ' + hh + ':' + mm;
    loginEl.textContent = 'Last login: ' + stamp + ' on ttys002';
  }

  // Subject picker -> reveal correspondence form
  var subjectRow = document.getElementById('subject-row');
  var form = document.getElementById('note-form');
  var messageField = document.getElementById('f-message');
  var chosenSubject = '';

  if (subjectRow && form) {
    var chips = subjectRow.querySelectorAll('.chip-btn');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
        chip.setAttribute('aria-pressed', 'true');
        chosenSubject = chip.getAttribute('data-subject');
        form.classList.remove('is-hidden');
        if (messageField && !messageField.value) {
          messageField.focus();
        }
      });
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('f-name').value.trim();
      var email = document.getElementById('f-email').value.trim();
      var message = document.getElementById('f-message').value.trim();
      var subject = chosenSubject || 'Hello';

      var bodyLines = [];
      if (name) bodyLines.push('From: ' + name);
      if (email) bodyLines.push('Reply to: ' + email);
      bodyLines.push('');
      bodyLines.push(message);

      var mailto = 'mailto:mahdee.khan@stonybrook.edu' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(bodyLines.join('\n'));

      window.location.href = mailto;
    });
  }
})();
