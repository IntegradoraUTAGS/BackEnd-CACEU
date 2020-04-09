const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//declarar esquema
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    apellidos: {
        type: String,
        required: [true, 'Por favor ingresa los apellidos']
    },
    matricula: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa la matricula']
    },
    password: {
        type: String,
        required: [true, 'Por favor ingresa la contraseña']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
    },
    puesto: {
        type: String,
        required: [true, 'Por favor ingresa el puesto']
    },
    estado: {
        type: Boolean,
        default: true
    }
});
//el esquema utilize el plugin
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Usuario', usuarioSchema);