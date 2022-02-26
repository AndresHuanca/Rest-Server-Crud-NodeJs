// para utilizar path 
const path = require('path');
// Importando uuid para uid unicos para los archivos
const { v4: uuidv4 } = require('uuid');


const subirArchivo = ( files, extensionesValidas = [ 'png', 'jpg', 'jpeg', 'gif' ], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {
        
        // desustructurar 
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.'); //separa desdeel punto al tipo de archivo
        const extension = nombreCortado[ nombreCortado.length - 1 ];
    
        // Validar la Extension
        if( !extensionesValidas.includes( extension ) ) {
            return reject( `La extension ${ extension } no es valida`,
                            `Extensiones Validas ${ extensionesValidas }`);
    
        }
    
        // Concatenar el nuevo id unique with la extension
        const nombreTemp = uuidv4() + '.' + extension;
    
        // path para colocar el archivo
        // con archivo.name in the path asigna nombre original path.join( __dirname, '../uploads/', archivo.name )
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );
    
        archivo.mv( uploadPath, (err) => {
            if (err) {
                reject(err);
            }
    
            resolve( nombreTemp );
    
        });

    });
    

};

module.exports = {
    subirArchivo
};