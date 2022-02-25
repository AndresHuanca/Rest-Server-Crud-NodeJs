const { Router } = require('express');

const { check } = require('express-validator');

// Middlewares
const { validarJWT, 
        validarCampos, 
        esAdminRole } = require('../middlewares');

// import controllers
const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria } = require('../controllers/categorias');

const { existeCategoriaPorId, 
        nombreCategoriaExiste } = require('../helpers/db-validators');


const router = Router();

// {{url}}/api/categorias

// Obtener todas las categorias - publico
router.get( '/', obtenerCategorias );

// Obtener una categoria by id - publico
// validar si el id existe
router.get( '/:id', [
    check( 'id', 'No es un Id Valido' ).isMongoId(),
    check( 'id' ).custom( existeCategoriaPorId ),
    validarCampos

], obtenerCategoria );

// Crear una categoria - privado - cualquier persona with a token validate
router.post( '/', [ 
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check( 'nombre' ).custom( nombreCategoriaExiste ),
    validarCampos
], crearCategoria );

// Actualizar - privado - cualquier persona with a token validate
// minimo venga el nombre
router.put( '/:id', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check( 'id', 'No es un Id Valido' ).isMongoId(),
    check( 'id' ).custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria );

// Delete an categoria - Admin
// que sea un id de mongo
router.delete( '/:id', [
    validarJWT,
    esAdminRole,
    check( 'id', 'No es un Id valido ').isMongoId(),
    check( 'id' ).custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria );

// // Delete an categoria - Admin
// router.delete( '/:id', ( req, res ) => {
//     res.json('delete'); ---EXAMPLE CONECCTION CONTROLLER---
// });

module.exports = router;