function validarEntrada() {
    var datos = {
        contrasena: document.getElementById("contrasena").value,
        emailEmpleado: document.getElementById("emailEmpleado").value
    }

    fetch("http://localhost:5000/empleado/loginAdmin", {
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
                    if (document.getElementById('emailEmpleado').value == response[0]['emailEmpleado'] && document.getElementById('contrasena').value == response[0]['contrasena']) {
                        localStorage.setItem("conectado", "1");
                        localStorage.setItem("idMongo", response[0]['_id']);
                        localStorage.setItem("nombre", response[0]['primerNombre']);
                        localStorage.setItem("rol", response[0]['rol']);
                        window.location.replace("menu.html");
                    }
                }
                else {
                    Swal.fire("Datos incorrectos");
                }
            }
        );
}