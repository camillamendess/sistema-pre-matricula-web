const express = require('express');
const PreMatriculaController = require('../controllers/PreMatriculaController');
const { autenticarToken, autorizarAdmin, autorizarAluno } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/relatorio', autenticarToken, autorizarAdmin, PreMatriculaController.relatorio);
router.get('/minhas', autenticarToken, autorizarAluno, PreMatriculaController.listarMinhas);
router.get('/aluno/:id_aluno', autenticarToken, autorizarAdmin, PreMatriculaController.listarPorAluno);
router.post('/admin', autenticarToken, autorizarAdmin, PreMatriculaController.cadastrarParaAluno);
router.post('/', autenticarToken, autorizarAluno, PreMatriculaController.cadastrar);
router.get('/', autenticarToken, autorizarAdmin, PreMatriculaController.listar);
router.delete('/:id', autenticarToken, autorizarAdmin, PreMatriculaController.excluir);

module.exports = router;
