const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const { autenticarToken, autorizarAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(autenticarToken, autorizarAdmin);

router.post('/admin', UsuarioController.cadastrarAdmin);
router.get('/', UsuarioController.listar);
router.get('/:id', UsuarioController.buscar);
router.put('/:id', UsuarioController.atualizar);
router.delete('/:id', UsuarioController.excluir);

module.exports = router;
