const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken } = require('../../middlewares/autentificacion');
const Usuario = require('../../models/usuario'); //subir nivel
const app = express();

app.post('/usuario/obtener', (req, res) => {
    /*let desde = req.params.desde || 0;
    desde = Number(desde); //forzar que el dato siempre sea numerico
    let limite = req.params.limite || 0;
    limite = Number(limite);*/

    Usuario.find({}, { 'nombre': 1, 'apellidos': 1, 'matricula': 1, 'puesto': 1, 'estado': 1 }) //select * from usuario where estado=true
        //solo aceptan valores numericos
        //.skip(desde)
        //.limit(limite)
        .exec((err, usuarios) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.usuario);
            return res.status(200).json({
                ok: true,
                count: usuarios.length,
                usuarios
            });
        });
});
app.post('/usuario/registrar', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        //para poder mandar los datos a la coleccion
        nombre: body.nombre,
        apellidos: body.apellidos,
        matricula: body.matricula,
        password: bcrypt.hashSync(body.password, 10), //numero de veces de encriptar
        puesto: body.puesto
    });

    usuario.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB,
            mensaje: usrDB.nombre + ' Ha sido Registrado Correctamente'
        });
    });
});

app.put('/usuario/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'estado', 'role', 'img']); //FILTRAR del body, on el pick seleccionar los campos que interesan del body 
    //id 'su coleccion, new -> si no existe lo inserta, runVali-> sirve para validar todas las condiciones del modelo 
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
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


app.post('/usuario/actualizar/estado', (req, res) => {
    let matricula = req.body.matricula;
    Usuario.findOneAndUpdate({ matricula: matricula }, { estado: true }) //select * from usuario where estado=true
        //solo aceptan valores numericos
        //.skip(desde)
        //.limit(limite)
        .exec((err, usuarios) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.usuario);
            return res.status(200).json({
                ok: true,
                count: usuarios.length,
                usuarios
            });
        });

    //let body = _.pick(req.body, ['nombre', 'estado', 'role', 'img']); //FILTRAR del body, on el pick seleccionar los campos que interesan del body 
    //id 'su coleccion, new -> si no existe lo inserta, runVali-> sirve para validar todas las condiciones del modelo 
    /*Usuario.findOneAndUpdate({ matricula: matricula }, { estado: true }, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
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

    });*/


});

app.delete('/usuario/eliminar/:id', (req, res) => {
    let id = req.params.id;
    //     Usuario.deleteOne({ _id: id }, (err, resp) => {
    //         if (err) {
    //             return res.status(400).json({
    //                 ok: false,
    //                 err
    //             });
    //         }
    //         //comprueba si eliminó algo
    //         if (resp.deletedCount === 0) {
    //             return res.status(400).json({
    //                 ok: false,
    //                 err: {
    //                     id,
    //                     msg: 'Usuario no encontrado'
    //                 }
    //             });
    //         }

    //         return res.status(200).json({
    //             ok: true,
    //             resp
    //         });
    //     });

    //update from - set 
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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