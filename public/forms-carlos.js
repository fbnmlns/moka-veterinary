

//**************************************************************************************** *//

const nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('clientId');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": document.getElementById("nombresMascota").value,
        "cedulaCliente": document.getElementById("cedulaCliente").value,
        "raza": document.getElementById("raza").value,
        "observaciones": document.getElementById("observacionesMascota").value,
        "genero": document.getElementById("generoMascotas").value,
        "idCliente": document.getElementById("idCliente").value,
        "fechaNacimiento": document.getElementById("edadMascota").value,
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:5000/pets/add-pet", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
})