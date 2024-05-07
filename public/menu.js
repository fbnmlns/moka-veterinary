var a = document.getElementById("Usuarios1");
a.addEventListener('click', cambiarPantalla);

function cambiarPantalla(){
    if(localStorage.getItem("rol") != "Admin"){
        Swal.fire("No tiene permitido ingresar a esa seccion");
    }else{
        window.location.replace("http://localhost:5000/Usuarios1.html");
    }
}