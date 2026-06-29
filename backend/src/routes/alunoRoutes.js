const express = require('express');
const AlunoController = require('../controllers/AlunoController');
const { autenticarToken, autorizarAdmin, autorizarAluno } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', AlunoController.cadastrar);
router.get('/me', autenticarToken, autorizarAluno, AlunoController.buscarMeuPerfil);
router.get('/', autenticarToken, autorizarAdmin, AlunoController.listar);
router.get('/:id', autenticarToken, autorizarAdmin, AlunoController.buscar);
router.put('/:id', autenticarToken, autorizarAdmin, AlunoController.atualizar);
router.delete('/:id', autenticarToken, autorizarAdmin, AlunoController.excluir);

module.exports = router;
