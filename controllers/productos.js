const { response } = require('express');

const { Producto } = require('../models');

//POST- Create Product 
const crearProducto = async( req, res = response ) => {

    const { estado, usuario, ...body } = req.body;

    // Enviar categoria en body by ID
    // Generar la data a guardar

    //  // Validacion si esta en la DB
    // const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });

    // if( productoDB ) {
    //     return res.status( 400 ).json({
    //         msg: `La categoria ${ productoDB.nombre } existe en DB`
    //     });
    // }

    const data = {
        ...body,
        categoria: body.categoria,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    
    };

    // Crear Producto
    const producto = new Producto( data );

    // Guardar en DB
    await producto.save();

    // msg
    res.status(201).json( producto );

};

// GET Display All
const obtenerProductos = async ( req, res ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    
    //es como una validacion IMP 
    const [ total, usuarios ] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query )
            .skip( Number( desde ))
            .limit( Number( limite ))

    ]);

    res.json({
        total,
        usuarios
    });
};

//GET Display by Id 
const obtenerProducto = async ( req, res ) => {

    const { id } = req.params;

    const producto = await Producto.findById( id ).populate( 'usuario', 'nombre' );

    //Validacion de DB 
    // verificar si el id existe
    const existeProductoPorId = await Producto.findById(  id  );

    if( !existeProductoPorId ) {
        return res.status( 400 ).json({
            msg: `el id ${ id } no existe`
        });
    }


    res.json({
        producto
    });

};

//PUT - Update product 
const actualizarProducto = async( req, res ) =>{

    const { id } = req.params;

    // desustructurar
    const { estado, usuario, ...resto } = req.body;
    // Set name by middlewares
    resto.nombre = resto.nombre.toUpperCase();

    // Validacion existeProductoPorId
    const existeProducto = await Producto.findById( id );
    if ( !existeProducto ) { 
        res.status( 400 ).json({
            msg: `Este Id ${ id } no existe `
        });

    }

    //Set User que hizo el ultimo Update
    resto.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id, resto, { new: true }).populate('usuario', 'nombre');

    res.status( 500 ).json({
        producto
    });

};

// DELETE - Admin Role
const eliminarProducto = async ( req, res ) => {

    const { id } = req.params;

    // borrar fisicamente
    // const categoria =  await Producto.findByIdAndDelete( id );

    // Validacion existeProductoPorId
    const existeProducto = await Producto.findById( id );
    if (!existeProducto ) {
        res.status( 500 ).json({
            msg: ` El Id ${ id } no existe`
        });
    }

    const producto = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true}).populate('usuario', 'nombre');

    res.json({
        producto
    });

};

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
};