const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const alunoRoutes = require('./routes/alunoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/aluno', alunoRoutes);
app.use('/api/usuario', usuarioRoutes);

module.exports = app;
