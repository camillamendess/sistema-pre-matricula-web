const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const alunoRoutes = require('./routes/alunoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/disciplinas', disciplinaRoutes);

module.exports = app;
