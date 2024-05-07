function cargarDatosReservacion() {
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
        const fechaEntrada = document.getElementById("fechaEntrada");
        const fechaSalida = document.getElementById("fechaSalida");
        const numeroCuarto = document.getElementById("numeroCuarto");

        nombreMascota.value = json.nombreMascota;
        fechaEntrada.value = json.fechaEntrada;
        fechaSalida.value = json.fechaSalida;
        numeroCuarto.value = json.numeroCuarto;
      }
    )
}

const butonActualizar = document.getElementById("butonActualizar");

butonActualizar.addEventListener("click", actualizarReservacion);

function actualizarReservacion() {
  const direccion = window.location.search;
  const variables = new URLSearchParams(direccion);
  const id = variables.get("id");
  
  const dato = {
    idReservacion: id,
    numeroCuarto: document.getElementById("numeroCuarto").value
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

var a = document.getElementById("sideBar-Usuarios1");
a.addEventListener('click', cambiarPantalla);

function cambiarPantalla(){
    if(localStorage.getItem("rol") != "Admin"){
        Swal.fire("No tiene permitido ingresar a esa seccion");
    }else{
        window.location.replace("http://localhost:5000/Usuarios1.html");
    }
}