let params = (new URL(document.location)).searchParams;
let clientId = params.get("clientId");
let isEditable = params.get("isEdit");
let petId = params.get("petId");

if (isEditable == null) {
    document.getElementById("idCliente").style.display = 'none';
} else {
    document.getElementById("dynamic-select").style.display = 'none';

}

fetch("http://localhost:5000/files/", requestOptions)
    .then(response => response.json())
    .then(result => {
        // alert(result.data.msg)
        result = result.map((item) => {
            console.log('====================================');
            console.log(item);
            console.log('====================================');
            var select = document.getElementById("dynamic-select");
            select.options[select.options.length] = new Option(`${item?.nombreCompleto}`, `${item?._id}`);
        });

    })
    .catch(error => console.log('error', error));

var requestOptions = {
    method: 'GET',
};

if (isEditable != null) {
    fetch(`http://localhost:5000/pets/getPetById/${petId}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(result => {

            console.log('==============result.user======================');
            console.log(result.user);
            console.log('====================================');
            document.getElementById("nombresMascota").value = result?.user?.nombreMascota
            document.getElementById("raza").value = result?.user?.raza
            document.getElementById("observacionesMascota").value = result?.user?.observaciones
            document.getElementById("generoMascotas").value = result?.user?.genero
            document.getElementById("edadMascota").value = new Date(result?.user?.fechaNacimiento).toISOString().split('T')[0]

            document.getElementById("fileimage").src = `http://localhost:5000/pets/${result?.user?.imagen}`;


        })
        .catch(error => console.log('error', error));
}

document.getElementById("idCliente").value = clientId;
const nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", () => {


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", 'multipart/form-data');



    var formdata = new FormData();
    formdata.append("file", myfile.files[0]);
    formdata.append("name", document.getElementById("nombresMascota").value);
    formdata.append("raza", document.getElementById("raza").value);
    formdata.append("observaciones", document.getElementById("observacionesMascota").value);
    formdata.append("genero", document.getElementById("generoMascotas").value);
    formdata.append("idCliente", clientId ? clientId : document.getElementById("dynamic-select").value);
    formdata.append("fechaNacimiento", document.getElementById("edadMascota").value);

    if (isEditable != null) {

        var requestOptions = {
            method: 'PUT',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/pets/updateNewPet/${petId}`, requestOptions)
            .then(response => response.json())
            .then(result => { alert('Record Updated!'); window.location.href = `http://localhost:5000/mascotas.html?clientId=${clientId}` })
            .catch(error => console.log('error', error));

    } else {

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/pets/add-pet", requestOptions)
            .then(response => response.json())
            .then(result => { alert('Record Added!'); window.location.href = `http://localhost:5000/listaClientes.html` })
            .catch(error => console.log('error', error));

    }



})
