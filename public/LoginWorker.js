function validarEntrada() {
    var datos = {
        pinEmpleado: document.getElementById("pinEmpleado").value,
    }

    fetch("http://localhost:5000/empleado/loginEmpleado", {
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
            function (response) {
                if (response.length > 0) {
                    if (document.getElementById('pinEmpleado').value == response[0]['pinEmpleado']) {
                        localStorage.setItem("conectado", "1");
                        localStorage.setItem("idMongo", response[0]['_id']);
                        localStorage.setItem("nombre", response[0]['primerNombre']);
                        window.location.replace("menu.html");
                    } else {
                        Swal.fire("Pin incorrecto");
                    }
                } else {
                    Swal.fire("Pin inexistente");
                }
            }
        );
}