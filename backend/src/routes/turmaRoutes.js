const express = require('express');
const TurmaController = require('../controllers/TurmaController');

const router = express.Router();

router.post('/', TurmaController.cadastrar);
router.get('/', TurmaController.listar);
router.get('/:id', TurmaController.buscar);
router.put('/:id', TurmaController.atualizar);
router.delete('/:id', TurmaController.excluir);

module.exports = router;