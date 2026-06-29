const pool = require('../config/database');

class DisciplinaModel {
    static async criar(codigo, nome, creditos, departamento) {
        const query = `
            INSERT INTO Disciplina (codigo, nome, creditos, departamento)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const { rows } = await pool.query(query, [codigo, nome, creditos, departamento]);
        return rows[0];
    }

    static async listarTodas(filtros = {}) {
        const conditions = [];
        const values = [];

        if (filtros.codigo) {
            values.push(`%${filtros.codigo}%`);
            conditions.push(`codigo ILIKE $${values.length}`);
        }

        if (filtros.nome) {
            values.push(`%${filtros.nome}%`);
            conditions.push(`nome ILIKE $${values.length}`);
        }

        if (filtros.departamento) {
            values.push(`%${filtros.departamento}%`);
            conditions.push(`departamento ILIKE $${values.length}`);
        }

        if (filtros.creditos !== undefined) {
            values.push(filtros.creditos);
            conditions.push(`creditos = $${values.length}`);
        }

        const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
        const query = `SELECT * FROM Disciplina ${whereClause} ORDER BY id_disciplina`;
        const { rows } = await pool.query(query, values);
        return rows;
    }

    static async buscarPorId(id_disciplina) {
        const query = 'SELECT * FROM Disciplina WHERE id_disciplina = $1';
        const { rows } = await pool.query(query, [id_disciplina]);
        return rows[0];
    }

    static async listarAlunos(id_disciplina) {
        const query = `
            SELECT DISTINCT
                a.id_aluno,
                COALESCE(a.nome, u.nome) AS nome,
                COALESCE(a.email, u.email) AS email,
                a.matricula,
                pm.data_solicitacao,
                t.id_turma,
                t.codigo_turma,
                t.periodo_letivo
            FROM Pre_Matricula pm
            JOIN Aluno a ON pm.id_aluno = a.id_aluno
            LEFT JOIN Usuario u ON a.id_usuario = u.id_usuario
            JOIN Turma t ON pm.id_turma = t.id_turma
            WHERE t.id_disciplina = $1
            ORDER BY nome ASC
        `;
        const { rows } = await pool.query(query, [id_disciplina]);
        return rows;
    }

    static async buscarPorCodigo(codigo) {
        const query = 'SELECT * FROM Disciplina WHERE codigo = $1';
        const { rows } = await pool.query(query, [codigo]);
        return rows[0];
    }

    static async atualizar(id_disciplina, codigo, nome, creditos, departamento) {
        const query = `
            UPDATE Disciplina
            SET codigo = $1, nome = $2, creditos = $3, departamento = $4
            WHERE id_disciplina = $5
            RETURNING *
        `;
        const { rows } = await pool.query(query, [codigo, nome, creditos, departamento, id_disciplina]);
        return rows[0];
    }

    static async excluir(id_disciplina) {
        const query = 'DELETE FROM Disciplina WHERE id_disciplina = $1 RETURNING id_disciplina';
        const { rows } = await pool.query(query, [id_disciplina]);
        return rows[0];
    }
}

module.exports = DisciplinaModel;
