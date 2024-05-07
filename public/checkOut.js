function cargarDatosCheckOut() {
  const direccion = window.location.search;
  const variables = new URLSearchParams(direccion);
  const id = variables.get("id");

  const datos = {
    idReservacion: id
  }
  
  fetch("http://localhost:5000/reservaciones/buscar", {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {'Content-Type': 'application/json'}
  })
    .then(
      function(response){
        return response.json();
      }
    )
    .then (
      function(json) {
        const nombreMascota = document.getElementById("nombreMascota");

        nombreMascota.innerHTML = json.nombreMascota;
      }
    )
}

const botonGuardar = document.getElementById("botonGuardar");

botonGuardar.addEventListener("click", guardarReservacion);

function guardarReservacion() {
  const direccion = window.location.search;
  const variables = new URLSearchParams(direccion);
  const id = variables.get("id");
  const estadoReservacion = false;
  
  const dato = {
    idReservacion: id,
    observaciones: document.getElementById("observaciones").value,
    estadoReservacion: estadoReservacion
  };

  fetch("http://localhost:5000/reservaciones/actualizar", {
    method: 'PUT',
    body: JSON.stringify(dato),
    headers: {'Content-Type': 'application/json'}
  })
    .then(
      function(response){
        return response.json();
      }
    )
}

function actualizarMascota() {
  var direccion = window.location.search;
  var variables = new URLSearchParams(direccion);
  var idMascota = variables.get("idMascota");
  var ranking = document.querySelector('input[name="rate"]:checked');

  var datos = {
      idMascota: idMascota,
      ranking: ranking.value
  }

  fetch("http://localhost:5000/cita/actualizarDatosMascota", {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: { 'Content-Type': 'application/json' }
  }).then(
      function (response) {
          return response.json();
      }
  )
}

var a = document.getElementById("sideBar-Usuarios1");
a.addEventListener('click', cambiarPantalla);

function cambiarPantalla(){
    if(localStorage.getItem("rol") != "Admin"){
        Swal.fire("No tiene permitido ingresar a esa seccion");
    }else{
        window.location.replace("http://localhost:5000/Usuarios1.html");
    }
}