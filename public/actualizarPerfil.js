_id = localStorage.getItem("idMongo");

function actualizarPerfil() {

    var datos = {
        _id: _id,
        primerNombre: document.getElementById("primerNombre").value,
        segundoNombre: document.getElementById("segundoNombre").value,
        primerApellido: document.getElementById("primerApellido").value,
        segundoApellido: document.getElementById("segundoApellido").value,
        telefonoEmpleado: document.getElementById("telefonoEmpleado").value,
        direccionEmpleado: document.getElementById("direccionEmpleado").value,
        emailEmpleado: document.getElementById("emailEmpleado").value


    }
    fetch("http://localhost:5000/empleado/actualizarPerfil", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            function (response) {
                return response.json();
            }
        )
}
/***************************CARGAR IMAGEN ******************/
const imgUpload = document.querySelector('#myfile');
var imgstorage = "";  // Guardo mi imagen. 
//Creo un event Listener para decirle que hacer despues que doy click en upload.

imgUpload.addEventListener("change", function () {
    const lector = new FileReader(); // necesito leer 
    lector.addEventListener("load", () => {
        imgstorage = lector.result; // cuando la imagen este uploaded, necesito guardarla.
        document.querySelector("#imgDisplay").style.backgroundImage = `url(${imgstorage})`; // para display mi imagen
    });
    lector.readAsDataURL(this.files[0]); // Metodo FileReader
})


