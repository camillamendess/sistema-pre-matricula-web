const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = express.Router();

router.post('/admin', UsuarioController.cadastrarAdmin);
router.get('/', UsuarioController.listar);
router.get('/:id', UsuarioController.buscar);
router.put('/:id', UsuarioController.atualizar);
router.delete('/:id', UsuarioController.excluir);

module.exports = router;