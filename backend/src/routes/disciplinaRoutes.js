const express = require('express');
const DisciplinaController = require('../controllers/DisciplinaController');
const { autenticarToken, autorizarAdmin, autorizarAutenticado } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', autenticarToken, autorizarAutenticado, DisciplinaController.listar);
router.get('/:id', autenticarToken, autorizarAutenticado, DisciplinaController.buscar);
router.post('/', autenticarToken, autorizarAdmin, DisciplinaController.cadastrar);
router.put('/:id', autenticarToken, autorizarAdmin, DisciplinaController.atualizar);
router.delete('/:id', autenticarToken, autorizarAdmin, DisciplinaController.excluir);

module.exports = router;
