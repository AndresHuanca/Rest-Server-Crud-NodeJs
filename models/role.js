//debe tener el mismo nombre de la coleccion pero sin la "s"

const { Schema, model } = require('mongoose');

const RoleSchema = Schema({ 

    rol:{
        type: String,
        required: [ true, 'el rol es obligatorio'],
    }

});

module.exports = model( 'Role', RoleSchema );