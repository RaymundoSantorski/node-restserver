// Requires
const express = require('express');
let app = express();
const { verificaToken } = require('../middlewares/autenticacion');
let Producto = require('../models/producto');
const _ = require('underscore');


// Obtener todos los productos 
app.get('/productos', verificaToken, (req, res) => {
    /**
     * Trea todos los productos
     * Populate: usuario categoria
     * paginado
     */
    let desde = Number(req.query.desde || 0);
    let limite = Number(req.query.limite || desde + 5);
    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!productos) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No se encontraron productos'
                    }
                });
            }

            res.json({
                ok: true,
                productos
            })
        })
});

// Obtener producto por id
app.get('/productos/:id', verificaToken, (req, res) => {
    /**
     * Populate: usuario categoria
     */
    let id = req.params.id;
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, producto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!producto) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `No se encontró el producto con id ${id}`
                    }
                });
            }
            res.json({
                ok: true,
                producto
            })
        });
});

// Buscar productos
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos
            })
        })
});

// Crear un nuevo producto
app.post('/productos', verificaToken, (req, res) => {
    /**
     * Grabar el usuario
     * Grabar la categoria del listado
     */
    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        disponible: body.disponible,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(201).json({
            ok: true,
            producto: productoDB
        });
    })
});

// Actualizar un producto
app.put('/productos/:id', verificaToken, (req, res) => {
    /**
     * Grabar el usuario
     * Grabar una categoria del listado
     */
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'disponible', 'categoria']);
    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            producto: productoDB
        })
    })
});

// Borrar un producto
app.delete('/productos/:id', verificaToken, (req, res) => {
    /**
     * Cambiar disponible a false
     */
    let id = req.params.id;
    let body = req.body;
    let data = {
        disponible: false
    }
    Producto.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: 'query' }, (err, productoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `No se encontró un producto con el id ${id}`
                }
            });
        }
        res.json({
            ok: true,
            producto: productoBorrado
        });
    })
});



module.exports = app;