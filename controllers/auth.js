const { response } = require('express');
// para validar la contraseña 
const bcryptjs = require('bcryptjs'); 

//para validar se utiliza imortar el modelo del usuario
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async( req, res = response ) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe 
        const usuario = await Usuario.findOne({ correo });
        if( !usuario ) {
            return res.status(400).json({ 
                msg: 'correo invalido'
            });
        }

        //verificar si el usuario esta activo
        if( !usuario.estado ) {
            return res.status(400).json({ 
                msg: 'correo en estado false'
            });
        }
        
        // Verificar si contraseña es correcta
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'El password no es corecto'
            });
        }
        
        // generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            msg: 'Hable con el administrador'
        });
    }


};

module.exports = {
    login
};