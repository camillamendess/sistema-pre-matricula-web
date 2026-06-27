const pool = require('../config/database');

class UsuarioModel {
    static async criarAdmin(nome, email, senhaHash) {
        const query = `
            INSERT INTO Usuario (nome, email, senha, tipo_usuario)
            VALUES ($1, $2, $3, 1)
            RETURNING id_usuario, nome, email, tipo_usuario
        `;
        const { rows } = await pool.query(query, [nome, email, senhaHash]);
        return rows[0];
    }

    static async listarTodos() {
        const query = 'SELECT id_usuario, nome, email, tipo_usuario FROM Usuario ORDER BY id_usuario';
        const { rows } = await pool.query(query);
        return rows;
    }

    static async buscarPorId(id_usuario) {
        const query = 'SELECT id_usuario, nome, email, tipo_usuario FROM Usuario WHERE id_usuario = $1';
        const { rows } = await pool.query(query, [id_usuario]);
        return rows[0];
    }

    static async buscarPorEmail(email) {
        const query = 'SELECT * FROM Usuario WHERE email = $1';
        const { rows } = await pool.query(query, [email]);
        return rows[0];
    }

    static async atualizar(id_usuario, nome, email) {
        const query = `
            UPDATE Usuario SET nome = $1, email = $2 
            WHERE id_usuario = $3 
            RETURNING id_usuario, nome, email, tipo_usuario
        `;
        const { rows } = await pool.query(query, [nome, email, id_usuario]);
        return rows[0];
    }

    static async atualizarSenha(id_usuario, senha_hash) {
        const query = 'UPDATE Usuario SET senha = $1 WHERE id_usuario = $2 RETURNING id_usuario';
        await pool.query(query, [senha_hash, id_usuario]);
    }

    static async excluir(id_usuario) {
        const query = 'DELETE FROM Usuario WHERE id_usuario = $1 RETURNING id_usuario';
        const { rows } = await pool.query(query, [id_usuario]);
        return rows[0];
    }
}

module.exports = UsuarioModel;