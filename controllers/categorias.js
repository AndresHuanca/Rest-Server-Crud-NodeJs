const { response } = require('express');

const { Categoria } = require('../models');

// obtenerCategorias -paginado- total - populate(ulti usuario) moongose
const obtenerCategorias = async( req, res= response ) => {

    const { limite = 5, desde = 0 } = req.query;
    // para mostrar los que no estan eliminados 
    const query = { estado: true };


    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query),
        Categoria.find( query )
            .populate('usuario', 'nombre')
            .skip( Number( desde ))
            .limit( Number( limite ))

    ]);

    res.json({
        total,
        categorias
    });

};

// obtenerCategoria (objeto) populate
const obtenerCategoria = async( req, res = response ) => {

    const { id } = req.params;

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');	

    res.json({
        categoria,
    });

};

const crearCategoria = async( req, res= response)  => {

    const nombre = req.body.nombre.toUpperCase();

    // Validacion si esta en la DB
    const categoriaDB = await Categoria.findOne({ nombre });

    if( categoriaDB ) {
        return res.status( 400 ).json({
            msg: `La categoria ${ categoriaDB.nombre } existe en DB`
        });
    }

    // Generar la data a guardar 
    const data = {
        nombre,
        usuario: req.usuario._id
    };

    // crear categoria
    const categoria = new Categoria( data );
    
    // Guardar en DB
    await categoria.save();

    // msg
    res.status(201).json( categoria );

};

// actualizarCategoria nombre
const actualizarCategoria = async( req, res ) => {

    const { id } = req.params;

    // desustructurar
    const { estado, usuario, ...resto } = req.body;
    // para colocar en mayusculas
    resto.nombre = resto.nombre.toUpperCase();
    //establecer usuario que hizo ultima modificacion
    resto.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, resto, {new: true});

    res.status( 500 ).json({
        categoria
    });

};

// borrarCategoria - estado:false<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const borrarCategoria = async( req, res ) => {

    const { id } = req.params;

    // borrar fisicamente
    // const categoria =  await Categoria.findByIdAndDelete( id );

    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true });

    res.json({
        msg: 'Delete Winner',
        categoria
    });

};


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
};