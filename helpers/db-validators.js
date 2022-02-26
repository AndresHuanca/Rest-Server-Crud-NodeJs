//importando Role
const Role = require('../models/role');

//importando modelo usuario //importando modelo categoria
const { Usuario, Categoria, Producto } = require('../models');


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
// ----------------------CATEGORIA-----------------------------
// Validaciones de BD de CATEGORIAS
const existeCategoriaPorId = async ( id = '' ) => { 
    // verifficar si el id existe
    existeCategoria = await Categoria.findById(id);
    if( !existeCategoria ) {
        throw new Error( `El id ${ id } no existe`)
        
    }
};

// Validación de Nombre unico de Categorias
const nombreCategoriaExiste = async ( nombre = '' ) => {
    // Convirtiendo a toUpperCase porque asi esta en la DB
    nombre = nombre.toUpperCase();  
    //verificar si el correo existe
    existeNombre = await Categoria.findOne( { nombre } );
    if( existeNombre ) {
        throw new Error( `El nombre ${ nombre } ya existe` );
    }

};

//-----------------------PRODUCTO----------------------------------- 
// Validación de Nombre unico de Productos
const nombreProductoExiste = async ( nombre = '' ) => {  
    // Convirtiendo a toUpperCase porque asi esta en la DB
    nombre = nombre.toUpperCase();
    //verificar si el correo existe
    const existeNombre = await Producto.findOne( { nombre } );
    if( existeNombre ) {
        throw new Error( `El nombre ${ nombre } ya existe` );
    }

};

// Validaciones de BD de CATEGORIAS
const existeProductoPorId = async ( id = '' ) => { 
    // verifficar si el id existe
    existeProducto = await Producto.findById(id);
    if( !existeProducto ) {
        throw new Error( `El id ${ id } no existe`)
        
    }
};

// Validaciones de Carga de Archivos
const coleccionesPermitidas =  (coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );

    if( !incluida ) {
        throw new Error( `La coleccion ${ coleccion } no existe, permitidas ${ colecciones }`);
    }

    return true;
};

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    nombreCategoriaExiste,
    nombreProductoExiste,
    existeProductoPorId,
    coleccionesPermitidas
};