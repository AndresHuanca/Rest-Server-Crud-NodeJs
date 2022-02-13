const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

//importar 
const { login } = require('../controllers/auth');

const router = Router();

//get, validaciones
router.post('/login',[
    check('correo', 'el correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatioria').not().isEmpty(),
    validarCampos
], login );


module.exports = router;