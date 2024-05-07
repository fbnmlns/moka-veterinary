// import mascotas from "../schemas/mascotas"

const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
function insertarClienteNuevo() {
  var datos = {
    nombreCompleto: document.getElementById("nombreCompleto").value,
    fechaDeNacimiento: document.getElementById("fechaDeNacimiento").value,
    correo: document.getElementById("correo").value,
    numeroDeCelular: document.getElementById("numeroDeCelular").value,
    genero: document.getElementById("genero").value,
    id: document.getElementById("id").value,
    direccionCompleta: document.getElementById("direccionCompleta").value,
    provincia: document.getElementById("provincia").value,
    canton: document.getElementById("canton").value,
    distrito: document.getElementById("distrito").value,
    observaciones: document.getElementById("observaciones").value,
    imagen: document.getElementById("imagen").value
  }

  fetch("http://localhost:5000/crearExpediente1/insertar", {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(
      function (response) {
        return response.json();
      }
    )
    .then(
      function (json) {
        var linea = "<tr><td>" + json._id + "</td><td>" + json.nombreCompleto + "</td><td>" + json.fechaDeNacimiento + "</td><td>" + json.correo + "</td><td>" + json.numeroDeCelular + "</td><td>" + json.genero + "</td><td>" + json.id + "</td><td>" + json.direccionCompleta + "</td><td>" + json.provincia + json.canton + json.distrito + json.observaciones + json.imagen + "</td></tr>";
        document.getElementById("tablaClientes").insertAdjacentHTML("beforeend", linea);
      }
    )
}


function cargarTabla() {
  fetch("http://localhost:5000/crearExpediente1/") // Misma url que uso en postman
    .then(
      function (response) {
        return response.json();
      }
    )
    .then(
      function (json) {
        for (var cont = 0; json.length > cont; cont++) {
          var linea = "<tr><td>" + json[cont].nombreCompleto + "</td><td>" + json[cont].numeroDeCelular + "</td><td>" + json[cont].direccionCompleta + json[cont].mascotas + "</td><td>" + "</td></td>";
          document.getElementById("tablaClientes").insertAdjacentHTML("beforeend", linea);
        }
      }
    )
}




const nextButton = document.getElementById('nextBtn');
nextButton.addEventListener('click', () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "nombreCompleto": document.getElementById("nombresCliente").value,
    "fechaDeNacimiento": document.getElementById("fechaNacimiento").value,
    "correo": document.getElementById("correo").value,
    "numeroDeCelular": document.getElementById("numeroCel").value,
    "genero": document.getElementById("genero").value,
    "id": document.getElementById("idCliente").value,
    "direccionCompleta": document.getElementById("direccionCompleta").value,
    "provincia": document.getElementById("provincia").value,
    "canton": document.getElementById("canton").value,
    "distrito": document.getElementById("distrito").value,
    "observaciones": document.getElementById("observacionesCliente").value,
    "imagen": document.getElementById("nombresCliente").value,
    "mascotas": mascotas
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:5000/crearExpediente1/", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      console.log(result._id)
      window.location.href = `http://localhost:5000/crearExpediente02.html?clientId=${result._id}`
    })
    .catch(error => console.log('error', error));
})











// export const crearMascota = (req, res) => {
//   const NuevaMascota = new mascotas();
//   NuevaMascota.body = req.body;
//   NuevaMascota.save()
//     .then((result) => {
//       User.findOne({ mascota: NuevaMascota.mascotas }, (err, user) => {
//         if (user) {
//           user.nuevaMascota.push(review);
//           user.save();
//           res.json({ message: 'Mascota Creada ' });
//         }
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     })
// }