const pool = require('../config/database');

class TurmaModel {
    static async criar(id_disciplina, codigo_turma, periodo_letivo) {
        const query = `
            INSERT INTO Turma (id_disciplina, codigo_turma, periodo_letivo)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const { rows } = await pool.query(query, [id_disciplina, codigo_turma, periodo_letivo]);
        return rows[0];
    }

    static async listarTodas(filtros = {}) {
        const conditions = [];
        const values = [];

        if (filtros.codigo_turma) {
            values.push(`%${filtros.codigo_turma}%`);
            conditions.push(`t.codigo_turma ILIKE $${values.length}`);
        }

        if (filtros.periodo_letivo) {
            values.push(`%${filtros.periodo_letivo}%`);
            conditions.push(`t.periodo_letivo ILIKE $${values.length}`);
        }

        if (filtros.id_disciplina) {
            values.push(filtros.id_disciplina);
            conditions.push(`t.id_disciplina = $${values.length}`);
        }

        if (filtros.nome_disciplina) {
            values.push(`%${filtros.nome_disciplina}%`);
            conditions.push(`d.nome ILIKE $${values.length}`);
        }

        if (filtros.codigo_disciplina) {
            values.push(`%${filtros.codigo_disciplina}%`);
            conditions.push(`d.codigo ILIKE $${values.length}`);
        }

        const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
        const query = `
            SELECT t.id_turma, t.codigo_turma, t.periodo_letivo, d.id_disciplina, d.codigo AS codigo_disciplina, d.nome AS nome_disciplina
            FROM Turma t
            JOIN Disciplina d ON t.id_disciplina = d.id_disciplina
            ${whereClause}
            ORDER BY t.periodo_letivo DESC, d.nome ASC
        `;
        const { rows } = await pool.query(query, values);
        return rows;
    }

    static async buscarPorId(id_turma) {
        const query = `
            SELECT t.*, d.nome AS nome_disciplina, d.codigo AS codigo_disciplina
            FROM Turma t
            JOIN Disciplina d ON t.id_disciplina = d.id_disciplina
            WHERE t.id_turma = $1
        `;
        const { rows } = await pool.query(query, [id_turma]);
        return rows[0];
    }

    // Evitar duplicação de turmas iguais
    static async buscarTurmaEspecifica(id_disciplina, codigo_turma, periodo_letivo) {
        const query = `
            SELECT * FROM Turma
            WHERE id_disciplina = $1 AND codigo_turma = $2 AND periodo_letivo = $3
        `;
        const { rows } = await pool.query(query, [id_disciplina, codigo_turma, periodo_letivo]);
        return rows[0];
    }

    static async atualizar(id_turma, id_disciplina, codigo_turma, periodo_letivo) {
        const query = `
            UPDATE Turma
            SET id_disciplina = $1, codigo_turma = $2, periodo_letivo = $3
            WHERE id_turma = $4
            RETURNING *
        `;
        const { rows } = await pool.query(query, [id_disciplina, codigo_turma, periodo_letivo, id_turma]);
        return rows[0];
    }

    static async excluir(id_turma) {
        const query = 'DELETE FROM Turma WHERE id_turma = $1 RETURNING id_turma';
        const { rows } = await pool.query(query, [id_turma]);
        return rows[0];
    }
}

module.exports = TurmaModel;
