const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conectar a base de datos
        this.conectarDB();
        
        //Middlewares
        this.middlewares();
        //Rutas
        this.routes();
    }

    // DB
    async conectarDB() {
        await dbConnection();
    }

    // MIddlewares es una funcion que se ejecuta antes de llamar un controlador o un modelo
    middlewares() {
        //cors
        this.app.use( cors() );

        //lectura y parseo del body recibir de json
        this.app.use( express.json() );

        // directorio publico
        this.app.use( express.static('public') );

    }

    //siguiente ruta(get- put- post- delete)
    routes() {
        this.app.use(  this.authPath, require('../routes/auth') );
        this.app.use(  this.usuariosPath, require('../routes/usuarios') );

    }

    listen() {
        
        this.app.listen( this.port, () => {
        console.log('Hello World', this.port );
        });
    }

}

module.exports = Server;