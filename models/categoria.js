//debe tener el mismo nombre de la coleccion pero sin la "s"

const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({ 

    nombre:{
        type: String,
        required: [ true, 'el nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true, 
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

//sobreescribir funcion toJSON para no enviar el password y el _vv y el _id en el postman
CategoriaSchema.methods.toJSON = function() {

    const {__v, estado, ...data } = this.toObject();
    data.usuario.uid = data.usuario._id;
    delete data.usuario._id;
    return data;

};

module.exports = model( 'Categoria', CategoriaSchema );