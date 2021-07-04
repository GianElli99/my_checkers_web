var serverUrl = 'https://reqres.in/api/login';

var form = document.getElementById('contact-form');
form.addEventListener('submit', HandleSubmit);

function HandleSubmit(e) {
  e.preventDefault();
  var nombre = document.getElementById('nombre').value;
  console.log(nombre);
  var email = document.getElementById('email').value;
  var comentario = document.getElementById('comentario').value;

  var data = {
    nombre: nombre,
    email: email,
    comentario: comentario,
  };
  console.log(data);
  SendDataToServer(serverUrl, data);
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
