const mongoose = require('mongoose');

// funcion para conectarme a la DB

const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.MONGODB_CNN );
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
 
};

module.exports = {
    dbConnection
};