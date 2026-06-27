const express = require('express');
const AlunoController = require('../controllers/AlunoController');

const router = express.Router();

router.post('/', AlunoController.cadastrar);
router.get('/', AlunoController.listar);
router.get('/:id', AlunoController.buscar);
router.put('/:id', AlunoController.atualizar);
router.delete('/:id', AlunoController.excluir);

module.exports = router;