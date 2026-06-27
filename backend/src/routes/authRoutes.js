const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// Rota para o Login convencional (tanto para Admin quanto para Aluno)
// JSON esperado no corpo da requisição (body): { "email": "...", "senha": "..." }
router.post('/login', AuthController.login);

// Rota para o Primeiro Acesso do Aluno
// JSON esperado no corpo da requisição (body): { "email": "..." }
router.post('/primeiro-acesso', AuthController.primeiroAcesso);

module.exports = router;