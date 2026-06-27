const express = require('express');
const DisciplinaController = require('../controllers/DisciplinaController');

const router = express.Router();

router.post('/', DisciplinaController.cadastrar);
router.get('/', DisciplinaController.listar);
router.get('/:id', DisciplinaController.buscar);
router.put('/:id', DisciplinaController.atualizar);
router.delete('/:id', DisciplinaController.excluir);

module.exports = router;