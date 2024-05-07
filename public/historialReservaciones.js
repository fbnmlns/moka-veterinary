function cargarHistorialReservaciones() {
  fetch("http://localhost:5000/reservaciones/")
    .then(
      function (response) {
        return response.json();
      }
    )
    .then(
      function (json) {
        for (let cont = 0; json.length > cont; cont++) {
          if (json[cont].numeroCuarto == null) {
            json[cont].numeroCuarto = "aún no definido";

          }

          if (json[cont].observaciones == null) {
            json[cont].observaciones = "n/a";
          }


            const linea =
              "<tr><td>" + json[cont].nombreMascota +
              "</td><td>" + json[cont].fechaEntrada +
              "</td><td>" + json[cont].fechaSalida +
              "</td><td>" + json[cont].numeroCuarto +
              "</td><td>" + json[cont].observaciones + "</td></tr>";


            document.getElementById("tablaHistorialReservaciones").insertAdjacentHTML("beforeend", linea);
        }
      }
    )
}