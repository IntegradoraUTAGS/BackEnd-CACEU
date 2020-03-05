const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//declarar esquema
let Schema = mongoose.Schema;

let eventoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingrese el nombre del evento']
    },
    tipo: {
        type: String,
        required: [true, 'Por favor ingrese el Tipo']
    },
    enfoque: {
        type: String,
        required: [true, 'Por favor ingrese la Contraseña']
    },
    fechaInicio: {
        type: Date,

    },
    fechaFinal: {
        type: Date,
    },
    descripcion: {
        type: String,
        required: [true, 'Por favor ingrese la descripcion del Evento']

    },
    repetir: { //para usar la api de google para poder logear
        type: String,
        required: [true, 'Por favor ingrese la repeticion del Evento']

    },
    lugar: {
        type: String,
        required: [true, 'Por favor ingrese el lugar del Evento']
    },
    hora: {
        type: String,
        required: [true, 'Por favor ingrese la hora del evento']
    },
    capacidad: {
        type: Number,
        required: [true, 'Por favor ingrese la capacidad del Evento']
    },
    detalles: {
        type: String,
        required: [true, 'Por favor ingrese detalles del evento']

    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.ObjectId,
        ref: 'Usuario',
        required: [true, 'Porfavor ingresa el ID del usuario']
    }
});
//el esquema utilize el plugin
eventoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Evento', eventoSchema);