//importando Role
const Role = require('../models/role');

//importando modelo usuario
const Usuario = require('../models/usuario');

//validar role que esta en la base de datos
const esRoleValido = async(rol='') => {

    const existeRol = await Role.findOne( { rol } );
    if ( !existeRol ) {
            throw new Error( `El rol ${ rol } enviado no se encuantra en la DB` );
    }
};

const emailExiste = async ( correo = '' ) => {  
    //verificar si el correo existe
    existeEmail = await Usuario.findOne( { correo } );
    if( existeEmail ) {
        throw new Error( `El correo ${ correo } ya existe` );
    }

};

const existeUsuarioPorId= async ( id = '' ) => {  
    //verificar si el correo existe
    existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ) {
        throw new Error( `El id ${ id } no existe` );
    }

};

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
};