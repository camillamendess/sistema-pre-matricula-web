const express = require('express');
const TurmaController = require('../controllers/TurmaController');
const { autenticarToken, autorizarAdmin, autorizarAutenticado } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', autenticarToken, autorizarAutenticado, TurmaController.listar);
router.get('/:id/alunos', autenticarToken, autorizarAdmin, TurmaController.listarAlunos);
router.get('/:id', autenticarToken, autorizarAutenticado, TurmaController.buscar);
router.post('/', autenticarToken, autorizarAdmin, TurmaController.cadastrar);
router.put('/:id', autenticarToken, autorizarAdmin, TurmaController.atualizar);
router.delete('/:id', autenticarToken, autorizarAdmin, TurmaController.excluir);

module.exports = router;
