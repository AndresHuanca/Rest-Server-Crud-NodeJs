const { Schema, model } = require('mongoose');

//Modelo de Uusuario
const UsuarioSchema = Schema ({ 
    nombre: { 
        type: String, 
        required: [ true, 'El nombre es obligatorio'],
    },
    correo: { 
        type: String, 
        required: [ true, 'El correo es obligatorio'],
        unique: true, //correo unico
    },
    password: {  
        type: String, 
        required: [ true, 'La contraseña es obligatorio'],
    },
    img: { 
        type: String, 
    },
    rol: { 
        type: String, 
        required: [ true, 'El nombre es obligatorio'],
        // enum: [ 'ADMIN_ROLE', 'USER_ROLE' ] choca con la validacion
    },
    estado: { 
        type: Boolean,  
        default: true
    },
    google: { 
        type: Boolean,  
        default: false
    },
});

//sobreescribir funcion toJSON para no enviar el password y el _vv
UsuarioSchema.methods.toJSON = function() {

    const {__v, password, ...usuario } = this.toObject();
    return usuario;

};

module.exports = model( 'Usuario', UsuarioSchema );