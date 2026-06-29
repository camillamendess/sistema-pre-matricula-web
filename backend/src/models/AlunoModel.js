const pool = require('../config/database');
const normalizarEmail = require('../utils/normalizarEmail');

class AlunoModel {
    static async criarAluno(nome, email, matricula) {
        const emailNormalizado = normalizarEmail(email);
        const query = `
            INSERT INTO Aluno (nome, email, matricula)
            VALUES ($1, $2, $3)
            RETURNING id_aluno, id_usuario, nome, email, matricula
        `;
        const { rows } = await pool.query(query, [nome, emailNormalizado, matricula]);
        return { ...rows[0], tipo_usuario: 2 };
    }

    static async buscarPorEmail(email) {
        const query = `
            SELECT
                a.id_aluno,
                a.id_usuario,
                COALESCE(a.nome, u.nome) AS nome,
                COALESCE(a.email, u.email) AS email,
                a.matricula,
                COALESCE(u.tipo_usuario, 2) AS tipo_usuario
            FROM Aluno a
            LEFT JOIN Usuario u ON a.id_usuario = u.id_usuario
            WHERE LOWER(COALESCE(a.email, u.email)) = LOWER($1)
        `;
        const { rows } = await pool.query(query, [normalizarEmail(email)]);
        return rows[0];
    }

    static async vincularUsuario(id_aluno, id_usuario) {
        const query = `
            UPDATE Aluno
            SET id_usuario = $1
            WHERE id_aluno = $2
            RETURNING id_aluno, id_usuario, nome, email, matricula
        `;
        const { rows } = await pool.query(query, [id_usuario, id_aluno]);
        return rows[0];
    }

    static async listarTodos(filtros = {}) {
        const conditions = [];
        const values = [];

        if (filtros.nome) {
            values.push(`%${filtros.nome}%`);
            conditions.push(`COALESCE(a.nome, u.nome) ILIKE $${values.length}`);
        }

        if (filtros.email) {
            values.push(`%${filtros.email}%`);
            conditions.push(`COALESCE(a.email, u.email) ILIKE $${values.length}`);
        }

        if (filtros.matricula) {
            values.push(`%${filtros.matricula}%`);
            conditions.push(`a.matricula ILIKE $${values.length}`);
        }

        const query = `
            SELECT
                u.id_usuario,
                COALESCE(a.nome, u.nome) AS nome,
                COALESCE(a.email, u.email) AS email,
                COALESCE(u.tipo_usuario, 2) AS tipo_usuario,
                a.id_aluno,
                a.matricula
            FROM Aluno a
            LEFT JOIN Usuario u ON a.id_usuario = u.id_usuario
            ${conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''}
            ORDER BY a.id_aluno
        `;
        const { rows } = await pool.query(query, values);
        return rows;
    }

    static async buscarPorId(id_aluno) {
        const query = `
            SELECT
                u.id_usuario,
                COALESCE(a.nome, u.nome) AS nome,
                COALESCE(a.email, u.email) AS email,
                COALESCE(u.tipo_usuario, 2) AS tipo_usuario,
                a.id_aluno,
                a.matricula
            FROM Aluno a
            LEFT JOIN Usuario u ON a.id_usuario = u.id_usuario
            WHERE a.id_aluno = $1
        `;
        const { rows } = await pool.query(query, [id_aluno]);
        return rows[0];
    }

    static async buscarPorUsuarioId(id_usuario) {
        const query = `
            SELECT u.id_usuario, u.nome, u.email, u.tipo_usuario, a.id_aluno, a.matricula
            FROM Aluno a
            JOIN Usuario u ON a.id_usuario = u.id_usuario
            WHERE a.id_usuario = $1
        `;
        const { rows } = await pool.query(query, [id_usuario]);
        return rows[0];
    }

    static async atualizar(id_aluno, nome, email, matricula) {
        const emailNormalizado = normalizarEmail(email);
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const resBusca = await client.query('SELECT id_usuario FROM Aluno WHERE id_aluno = $1', [id_aluno]);
            if (resBusca.rowCount === 0) throw new Error('Aluno nao encontrado.');
            const id_usuario = resBusca.rows[0].id_usuario;

            await client.query(
                'UPDATE Aluno SET nome = $1, email = $2, matricula = $3 WHERE id_aluno = $4',
                [nome, emailNormalizado, matricula, id_aluno]
            );

            if (id_usuario) {
                await client.query(
                    'UPDATE Usuario SET nome = $1, email = $2 WHERE id_usuario = $3',
                    [nome, emailNormalizado, id_usuario]
                );
            }

            await client.query('COMMIT');
            return { id_aluno, id_usuario, nome, email: emailNormalizado, matricula, tipo_usuario: 2 };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async excluir(id_aluno) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const resBusca = await client.query('SELECT id_usuario FROM Aluno WHERE id_aluno = $1', [id_aluno]);
            if (resBusca.rowCount === 0) throw new Error('Aluno nao encontrado.');
            const id_usuario = resBusca.rows[0].id_usuario;

            await client.query('DELETE FROM Aluno WHERE id_aluno = $1', [id_aluno]);
            if (id_usuario) {
                await client.query('DELETE FROM Usuario WHERE id_usuario = $1', [id_usuario]);
            }

            await client.query('COMMIT');
            return true;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}

module.exports = AlunoModel;
