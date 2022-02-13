const { response, request } = require('express');

// para eliminar debe ser ADMIN_ROLE
const esAdminRole = ( req = request, res = response, next ) => {

    // error 500 es mio del backen
    // validar que el req.usuario ete viniendo
    if ( !req.usuario ) {
        return res.status( 500 ).json({
            msg: 'Se requiere verificar el role sin validar el token primero'
        });
    }
    // esta info ya esta en el validar-jwt y usuarios.delete
    const { rol, nombre } = req.usuario;

    if( rol!== 'ADMIN_ROLE' ) {
        return res.status( 401 ).json({
            msg: `${ nombre } nott es administrador not puede hacer esto`
        }); 
    }

    next(); 
};

// para eliminar desde un rol o varios roles Variables
const tieneRole = ( ...roles ) => {

    return ( req, res, next ) => {

        if ( !req.usuario ) {
            return res.status( 500 ).json({
                msg: 'Se requiere verificar el role sin validar el token primero'
            });
        }
        
        // validar rol que exista en las routes
        if( !roles.includes( req.usuario.rol )) {
            return res.status( 401 ).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }
    
        next();
    };
};

module.exports = {
    esAdminRole,
    tieneRole
};