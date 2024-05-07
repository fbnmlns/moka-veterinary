var express = require('express');
// Como import Java, importamos Express.
var path = require('path');
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// Incluir libreria ya propia de Node, le permite a node navegar entre carpetas. 
var mongoose = require('mongoose');
// importamos Mongoose.
var app = express();
//Inicializar la variable que es express. 
var usersRouter = require("./api/users");
var fileRoute = require("./api/files");
var petsRoute = require("./api/pets");
var padecimientoRouter = require("./api/Padecimiento");
var examenesRouter = require("./api/examenes");
var empleadoRouter = require('./api/empleado.js');
var reservacionesRouter = require('./api/reservaciones.js')
const multer = require("multer");
const createError = require('http-errors');
const bodyParser = require("body-parser");

mongoose.connect("mongodb+srv://MokaVet:F9VvUREdcZofLd8x@veterinaria.5y8g7bb.mongodb.net/Moka?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
// Me conecto a la base de datos. Añado my usuario y contraseña de Mongo

app.use(express.json()); // PARA PODER UTILIZAR POST

var folder = path.join(__dirname, 'public');
app.use(express.static(folder));
//Luego le digo que utilize esa carpeta, de lo contrario nunca la utilizara

// app.use('/empleado', require('./api/empleado.js'));
app.use('/cita', require('./api/cita.js'));
app.use("/users", usersRouter);
app.use("/files", fileRoute);
app.use("/pets", petsRoute);
app.use("/padecimiento", padecimientoRouter);
app.use("/examenes", examenesRouter);
app.use("/empleado", empleadoRouter);
app.use("/reservaciones", reservacionesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


app.use(bodyParser.json({ limit: 1024 * 1024 * 20, type: "application/json" }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: 1024 * 1024 * 20,
        type: "application/x-www-form-urlencoding",
    })
);


app.listen(5000, function () {
    console.log(mongoose.connection.readyState);
    console.log("Server is running at port 5000");
});





module.exports = app;

