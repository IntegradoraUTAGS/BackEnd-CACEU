const express = require('express');
//const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken } = require('../../middlewares/autentificacion');
const Evento = require('../../models/evento'); // subir nivel
const app = express();


app.get('/evento/obtener/:limite', (req, res) => {
    //let desde = req.params.desde || 0;
    //desde = Number(desde); //forzar que el dato siempre sea numerico
    let limite = req.params.limite || 0;
    limite = Number(limite);

    Evento.find({ estado: true }) //select * from usuario where estado=true
        //solo aceptan valores numericos
        //.skip(desde)
        .limit(limite)
        .exec((err, eventos) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.evento);
            return res.status(200).json({
                ok: true,
                count: eventos.length,
                eventos
            });
        });
});




app.post('/evento/registrar', (req, res) => {
    let body = req.body;
    let evento = new Evento({
        //para poder mandar los datos a la coleccion
        nombre: body.nombre,
        tipo: body.tipo,
        enfoque: body.enfoque,
        fechaInicio: body.fechaInicio,
        fechaFinal: body.fechaFinal,
        descripcion: body.descripcion,
        repetir: body.repetir,
        lugar: body.lugar,
        hora: body.hora,
        capacidad: body.capacidad,
        detalles: body.detalles,
        usuario: body.usuario


    });

    evento.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});

app.get('/evento/obtener', (req, res) => {
    /*let desde = req.params.desde || 0;
    desde = Number(desde); //forzar que el dato siempre sea numerico
    let limite = req.params.limite || 0;
    limite = Number(limite);*/

    Evento.find({ estado: true }) //select * from usuario where estado=true
        //solo aceptan valores numericos
        /* .skip(desde)
         .limit(limite)*/
        .exec((err, eventos) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.evento);
            return res.status(200).json({
                ok: true,
                count: eventos.length,
                eventos
            });
        });
});

app.put('/evento/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'tipo', 'enfoque', 'fechaInicio', 'fechaFinal', 'descripcion', 'repetir', 'lugar', 'hora', 'capacidad', 'detalles']); //FILTRAR del body, on el pick seleccionar los campos que interesan del body 
    //id 'su coleccion, new -> si no existe lo inserta, runVali-> sirve para validar todas las condiciones del modelo 
    Evento.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });

    });
});

app.delete('/evento/eliminar/:id', (req, res) => {
    let id = req.params.id;

    //update from - set 
    Evento.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});



module.exports = app;