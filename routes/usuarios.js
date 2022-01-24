const { Router } = require('express');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

//get
router.get('/', usuariosGet );

//put
router.put('/:id', usuariosPut );

//post   
router.post('/', usuariosPost );

//delete
router.delete('/', usuariosDelete );

//patch
router.patch('/', usuariosPatch );


module.exports = router;