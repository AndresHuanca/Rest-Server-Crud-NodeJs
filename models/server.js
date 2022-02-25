const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios'
        };

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
        
        this.app.use(  this.paths.auth, require('../routes/auth') );
        this.app.use(  this.paths.buscar, require('../routes/buscar') );
        this.app.use(  this.paths.categorias, require('../routes/categorias') );
        this.app.use(  this.paths.usuarios, require('../routes/usuarios') );
        this.app.use(  this.paths.productos, require('../routes/productos') );

    }

    listen() {
        
        this.app.listen( this.port, () => {
        console.log('Hello World', this.port );
        });
    }

}

module.exports = Server;