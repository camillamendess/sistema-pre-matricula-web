const pool = require('../config/database');
const normalizarEmail = require('../utils/normalizarEmail');

class UsuarioModel {
    static async criarAdmin(nome, email, senhaHash) {
        const emailNormalizado = normalizarEmail(email);
        const query = `
            INSERT INTO Usuario (nome, email, senha, tipo_usuario)
            VALUES ($1, $2, $3, 1)
            RETURNING id_usuario, nome, email, tipo_usuario
        `;
        const { rows } = await pool.query(query, [nome, emailNormalizado, senhaHash]);
        return rows[0];
    }

    static async criarAluno(nome, email, senhaHash) {
        const emailNormalizado = normalizarEmail(email);
        const query = `
            INSERT INTO Usuario (nome, email, senha, tipo_usuario)
            VALUES ($1, $2, $3, 2)
            RETURNING id_usuario, nome, email, tipo_usuario
        `;
        const { rows } = await pool.query(query, [nome, emailNormalizado, senhaHash]);
        return rows[0];
    }

    static async listarTodos(filtros = {}) {
        const conditions = [];
        const values = [];

        if (filtros.nome) {
            values.push(`%${filtros.nome}%`);
            conditions.push(`nome ILIKE $${values.length}`);
        }

        if (filtros.email) {
            values.push(`%${filtros.email}%`);
            conditions.push(`email ILIKE $${values.length}`);
        }

        if (filtros.tipo_usuario) {
            values.push(filtros.tipo_usuario);
            conditions.push(`tipo_usuario = $${values.length}`);
        }

        const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
        const query = `SELECT id_usuario, nome, email, tipo_usuario FROM Usuario ${whereClause} ORDER BY id_usuario`;
        const { rows } = await pool.query(query, values);
        return rows;
    }

    static async buscarPorId(id_usuario) {
        const query = 'SELECT id_usuario, nome, email, tipo_usuario FROM Usuario WHERE id_usuario = $1';
        const { rows } = await pool.query(query, [id_usuario]);
        return rows[0];
    }

    static async buscarPorEmail(email) {
        const query = 'SELECT * FROM Usuario WHERE LOWER(email) = LOWER($1)';
        const { rows } = await pool.query(query, [normalizarEmail(email)]);
        return rows[0];
    }

    static async atualizar(id_usuario, nome, email) {
        const emailNormalizado = normalizarEmail(email);
        const query = `
            UPDATE Usuario SET nome = $1, email = $2 
            WHERE id_usuario = $3 
            RETURNING id_usuario, nome, email, tipo_usuario
        `;
        const { rows } = await pool.query(query, [nome, emailNormalizado, id_usuario]);
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
