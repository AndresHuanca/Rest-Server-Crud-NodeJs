const { Router } = require('express');

//importando para la validacion
const { check } = require('express-validator');

//importando db-validators
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


//importando middleware
const { validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole

} = require('../middlewares');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

//get
router.get('/', usuariosGet );

//put
router.put('/:id',[
        check( 'id', 'No es un Id  Valido' ).isMongoId(),
        check( 'id' ).custom( existeUsuarioPorId ),
        check( 'rol' ).custom( esRoleValido ),
        validarCampos

], usuariosPut );

//post  - middleware segundo argumento , crear errores- crear
router.post('/', [
        //validaciones de los argumentos enviados en post
        check( 'nombre', 'El nombre  no es valido' ).not().isEmpty(), //isEmpty(¿es vacio?)(no().isEmpty 'no es correo')
        check( 'password', 'El password debe ser ma de 6 letras' ).isLength( { min: 6 } ), //tamaño mino de 6
        check( 'correo', 'El correo no es valido' ).isEmail(), //validacion que sea email
        check( 'correo' ).custom( emailExiste ),
        // check( 'rol', 'No es un rol valido' ).isIn( [ 'ADMIN_ROLE', 'USER_ROLE ' ] ), //definiendo los roles aceptados
        check( 'rol' ).custom( esRoleValido ),
        validarCampos

],usuariosPost );

//delete
router.delete('/:id', [
        validarJWT,
        // esAdminRole,
        tieneRole( 'ADMIN_ROLE', 'VENTAS_ROLE', 'USER_ROLE'),
        check( 'id', 'No es un Id  Valido' ).isMongoId(),
        check( 'id' ).custom( existeUsuarioPorId ),
        validarCampos

], usuariosDelete );

//patch
router.patch('/', usuariosPatch );


module.exports = router;