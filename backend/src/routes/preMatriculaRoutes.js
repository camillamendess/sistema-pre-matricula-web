const express = require('express');
const PreMatriculaController = require('../controllers/PreMatriculaController');
const { autenticarToken, autorizarAdmin, autorizarAluno } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/relatorio', autenticarToken, autorizarAdmin, PreMatriculaController.relatorio);
router.post('/', autenticarToken, autorizarAluno, PreMatriculaController.cadastrar);
router.get('/', autenticarToken, autorizarAdmin, PreMatriculaController.listar);
router.delete('/:id', autenticarToken, autorizarAdmin, PreMatriculaController.excluir);

module.exports = router;
