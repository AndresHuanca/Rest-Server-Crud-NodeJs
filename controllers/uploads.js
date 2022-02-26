// Import path and fs
const  path = require('path');
const  fs  = require('fs');

// import clodinary
const cloudinary = require('cloudinary').v2;
// backen autenticado con cloudinary
cloudinary.config( process.env.CLOUDINARY_URL);

const { response } = require('express');
const { subirArchivo } = require('../helpers');
// Import Models
const { Usuario, Producto } = require('../models');



const cargarArchivos = async( req, res = response ) => {
    
    // para ver el archivo subido en postman}
    console.log( req.files );

    try {
        // para subir archivos type txt, md
        // const nombre = await subirArchivo( req.files, [ 'txt', 'md' ], 'textos' );
        
        // para subir archivos imagens y crea una carpeta img
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        res.json({ nombre });
        
    } catch ( msg ) {
        res.status( 400 ).json({ msg });
    }
    
};

const actualizarImagen = async( req, res ) => {

    const { coleccion, id } = req.params;

    let modelo;
    
    // Validar si existe id and name of colection  
    switch ( coleccion ) {
        case 'usuarios': 
            modelo = await Usuario.findById( id );
            if( !modelo ) {
                return res.status( 400 ).json({ 
                    msg: `No se encontro Usuario con ese Id ${ id }`
                });
            }

            break;

        case 'productos': 
            modelo = await Producto.findById( id );
            if( !modelo ) {
                return res.status( 400 ).json({ 
                    msg: `No se encontro Producto con ese Id ${ id }`
                });
            }
            
            break;
    
        default:
            return res.status( 500 ).json({ msg: 'Se me olvido validar esto'} );
    }
    
    //Clean image previas
    if( modelo.img ) {
        // path of image
        const pathImage = path.join( __dirname, '../uploads', coleccion, modelo.img );

        // delete image server
        if( fs.existsSync( pathImage) ){
            fs.unlinkSync( pathImage );
        }
    } 

    // Subir y crear archivo según seu coleccion automatica
    const nombre = await subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;

    // guardar en DB
    await modelo.save();

    res.json({
        coleccion,
        id    
    });

};

// actualizar con cloudinary 
const actualizarImagenCloudinary = async( req, res ) => {

    const { coleccion, id } = req.params;

    let modelo;
    
    // Validar si existe id and name of colection  
    switch ( coleccion ) {
        case 'usuarios': 
            modelo = await Usuario.findById( id );
            if( !modelo ) {
                return res.status( 400 ).json({ 
                    msg: `No se encontro Usuario con ese Id ${ id }`
                });
            }

            break;

        case 'productos': 
            modelo = await Producto.findById( id );
            if( !modelo ) {
                return res.status( 400 ).json({ 
                    msg: `No se encontro Producto con ese Id ${ id }`
                });
            }
            
            break;
    
        default:
            return res.status( 500 ).json({ msg: 'Se me olvido validar esto'} );
    }
    
    //Clean image previas
    if( modelo.img ) {
        // desustructurar
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[ nombreArr.length - 1 ];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
    
    } 

    // extraer de req.files.archivo sus datos
    const { tempFilePath } = req.files.archivo;
    // Dentro de tempFilePath existe secure_url
    // const { secure_url } = await cloudinary.uploader.upload( tempFilePath ); clase

    const {secure_url} = await cloudinary.uploader.upload(tempFilePath,{folder:`RestServer NodeJs/${coleccion}`} );

    // Asignar
    modelo.img = secure_url;

    await modelo.save();

    res.json({
        modelo       
    });

};

// GET - Display image
const mostrarImagen = async ( req, res ) => {
    // dessustructurar date of params
    const { coleccion, id } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios': 
            modelo = await Usuario.findById( id );
            if( !modelo ) {
                return res.status( 400 ).json({ 
                    msg: `No se encontro Usuario con ese Id ${ id }`
                });
            }

            break;

        case 'productos': 
            modelo = await Producto.findById( id );
            if( !modelo ) {
                return res.status( 400 ).json({ 
                    msg: `No se encontro Producto con ese Id ${ id }`
                });
            }
            
            break;
    
        default:
            return res.status( 500 ).json({ msg: 'Se me olvido validar esto'} );
    }

     //Clean image previas
    if( modelo.img ) {
        // path of image
        const pathImage = path.join( __dirname, '../uploads', coleccion, modelo.img );

        // delete image server
        if( fs.existsSync( pathImage) ){
            // retunr image
            return res.sendFile( pathImage );
        }
    }

   //Cuando un producto or users no tienen imagenes retunr notImage 
    const pathFaltaImage = path.join( __dirname, '../assets/no-image.jpg' );
        return res.sendFile( pathFaltaImage );

    // // Cuando no existe image
    // res.json({ msg: 'falta place holder'})
};




module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
};