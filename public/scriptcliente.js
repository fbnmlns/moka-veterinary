let params = (new URL(document.location)).searchParams;
let clientId = params.get("clientId");
let isEditable = params.get("isEdit");
let petId = params.get("petId");


if (isEditable != null) {
    fetch(`http://localhost:5000/files/getFileById/${clientId}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(result => {

            console.log('==============result.user======================');
            console.log(result.user);
            console.log('====================================');
            document.getElementById("nombresCliente").value = result?.user?.nombresCliente
            document.getElementById("fechaNacimiento").value = new Date(result?.user?.fechaDeNacimiento).toISOString().split('T')[0]
            document.getElementById("correo").value = result?.user?.correo
            document.getElementById("numeroCel").value = result?.user?.numeroDeCelular
            document.getElementById("genero").value = result?.user?.genero

            document.getElementById("idCliente").value = result?.user?.id
            document.getElementById("direccionCompleta").value = result?.user?.direccionCompleta
            document.getElementById("provincia").value = result?.user?.provincia
            document.getElementById("canton").value = result?.user?.canton
            document.getElementById("distrito").value = result?.user?.distrito
            document.getElementById("observacionesCliente").value = result?.user?.observaciones
            document.getElementById("nombresCliente").value = result?.user?.nombreCompleto
            document.getElementById("fileimage").src = `http://localhost:5000/files/${result?.user?.imagen}`;


        })
        .catch(error => console.log('error', error));
}

const nextButton = document.getElementById('nextBtn');
nextButton.addEventListener('click', () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", 'multipart/form-data');


    var formdata = new FormData();
    formdata.append("file", myfile.files[0]);
    formdata.append("nombreCompleto", document.getElementById("nombresCliente").value);
    formdata.append("fechaDeNacimiento", document.getElementById("fechaNacimiento").value);
    formdata.append("correo", document.getElementById("correo").value);
    formdata.append("numeroDeCelular", document.getElementById("numeroCel").value);
    formdata.append("genero", document.getElementById("genero").value);
    formdata.append("id", document.getElementById("idCliente").value);
    formdata.append("direccionCompleta", document.getElementById("direccionCompleta").value);
    formdata.append("provincia", document.getElementById("provincia").value);
    formdata.append("canton", document.getElementById("canton").value);
    formdata.append("distrito", document.getElementById("distrito").value);
    formdata.append("observaciones", document.getElementById("observacionesCliente").value);
    formdata.append("mascotas", document.getElementById("nombresCliente").value);

    if (isEditable != null) {

        var requestOptions = {
            method: 'PUT',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/files/updateNewFile/${clientId}`, requestOptions)
            .then(response => response.json())
            .then(result => window.location.href = `http://localhost:5000/listaClientes.html`)
            .catch(error => console.log('error', error));

    } else {

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/files/add-new", requestOptions)
            .then(response => response.json())
            .then(result => window.location.href = `http://localhost:5000/listaClientes.html`)
            .catch(error => console.log('error', error));

    }




})