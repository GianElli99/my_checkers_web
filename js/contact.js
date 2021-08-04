var serverUrl = 'https://reqres.in/api/login';

var form = document.getElementById('contact-form');
form.addEventListener('submit', HandleSubmit);

function HandleSubmit(e) {
  e.preventDefault();
  var userName = document.getElementById('user-name').value.trim();
  var email = document.getElementById('email').value.trim();
  var comment = document.getElementById('comment').value.trim();

  var validation = ValidateFields(userName, email, comment);
  if (validation.isValid) {
    var data = {
      userName: userName,
      email: email,
      comment: comment,
    };

    SendDataToServer(serverUrl, data);
    window.open(
      'mailto:gianelli99@hotmail.com?subject=Comment about checkers, made by ' +
        userName +
        '&body=' +
        comment
    );
  } else {
    alert(validation.errorMsg);
  }
}

function SendDataToServer(url, data) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      console.log(jsonResponse);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function ValidateFields(name, email, comment) {
  var isValid = true;
  var errorMsg = '';

  if (!isValidName(name)) {
    isValid = false;
    errorMsg += 'Invalid Name. ';
  }
  if (!isValidEmail(email)) {
    isValid = false;
    errorMsg += 'Invalid Email. ';
  }
  if (comment.trim().length < 6) {
    isValid = false;
    errorMsg += 'Invalid Comment.';
  }

  return { isValid: isValid, errorMsg: errorMsg };
}
function isValidEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
function isValidName(name) {
  var re = /^[a-z0-9]+$/i;
  return re.test(name);
}
