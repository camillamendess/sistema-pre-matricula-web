const express = require('express');
const PreMatriculaController = require('../controllers/PreMatriculaController');

const router = express.Router();

router.get('/relatorio', PreMatriculaController.relatorio);
router.post('/', PreMatriculaController.cadastrar);
router.get('/', PreMatriculaController.listar);
router.delete('/:id', PreMatriculaController.excluir);

module.exports = router;