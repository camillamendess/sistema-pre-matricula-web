const app = require('./app');
const pool = require('./config/database');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

async function iniciarBancoDeDados() {
    try {
        const sqlPath = path.join(__dirname, 'config', 'init.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        await pool.query(sql);
        console.log('BD iniciado com sucesso!');
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
    }
}

iniciarBancoDeDados().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});