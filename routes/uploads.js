const { Router } = require('express');

const { check } = require('express-validator');

const { cargarArchivos, 
    actualizarImagen, 
    mostrarImagen, 
    actualizarImagenCloudinary } = require('../controllers/uploads');

const { coleccionesPermitidas } = require('../helpers');
const { validarArchivoSubir } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//POST - carga de archivos - validar mdinate midelwares token minimo
router.post( '/', [
    validarArchivoSubir
], cargarArchivos );

// PUT - actualizar Archivo
router.put( '/:coleccion/:id', [
    validarArchivoSubir,
    check( 'id', 'No es un Id Valido' ).isMongoId(),
    check( 'coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos' ]) ),
    validarCampos

], actualizarImagenCloudinary );
// ], actualizarImagen );

// GET - Display Image
router.get( '/:coleccion/:id', [
    check( 'id', 'No es un Id Valido' ).isMongoId(),
    check( 'coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos' ]) ),
    validarCampos
], mostrarImagen );


module.exports = router;