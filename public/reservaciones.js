function cargarTablaReservaciones() {
  fetch("http://localhost:5000/reservaciones/")
    .then(
      function (response) {
        return response.json();
      }
    )
    .then(
      function (json) {
        for (let cont = 0; json.length > cont; cont++) {

          if (json[cont].estadoReservacion === true || json[cont].estadoReservacion === null) {
            if (json[cont].numeroCuarto == null) {
              json[cont].numeroCuarto = "aún no definido";
            }

            const linea =
              "<tr><td>" + json[cont].nombreMascota +
              "</td><td>" + json[cont].fechaEntrada +
              "</td><td>" + json[cont].fechaSalida +
              "</td><td>" + json[cont].numeroCuarto +
              "</td><td><a href='checkIn.html?id=" + json[cont]._id + "'><button class=secondary-button-gris id= type=button>Check In</button></a>" +
              "</td><td><a href='checkOut.html?id=" + json[cont]._id + "'><button class=secondary-button-gris id= type=button>Check Out</button></a></tr>";

            document.getElementById("tablaReservaciones").insertAdjacentHTML("beforeend", linea);
          }
        }
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