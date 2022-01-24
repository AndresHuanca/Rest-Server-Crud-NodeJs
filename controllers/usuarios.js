const { response, request } = require('express');


//get
const usuariosGet = (req, res = request ) => {

    const { nombre= 'no name', page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        nombre,
        page,
        limit
    });

};

//put
const usuariosPut = (req, res) => {
    //para dinamico
    const id = req.params.id;

    res.status(500).json({
        msg: 'put API - controlador',
        id
    });
};

// post
const usuariosPost = (req, res = response ) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API controlador',
        nombre,
        edad
    });

};

//patch
const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    });

};

//delete
const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API controlador'
    });

};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
};