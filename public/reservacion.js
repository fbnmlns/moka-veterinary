const butonReservar = document.getElementById("butonReservar");

butonReservar.addEventListener("click", insertarReservacion);

function insertarReservacion() {
  const datos = {
    nombreMascota: document.getElementById("nombreMascota").value,
    fechaEntrada: document.getElementById("fechaEntrada").value,
    fechaSalida: document.getElementById("fechaSalida").value,
    cuidadosEspeciales: document.getElementById("cuidadosEspeciales").value,
    cedulaCliente: document.getElementById("cedulaCliente").value,
    idMascota: document.getElementById("nombreMascota").value + document.getElementById("cedulaCliente").value
  }
  
  fetch("http://localhost:5000/reservaciones/insertar", {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {'Content-Type': 'application/json'}
  })
    .then(
      function(response){
        return response.json();
        window.location.replace("http://localhost:5000/reservaciones.html");
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