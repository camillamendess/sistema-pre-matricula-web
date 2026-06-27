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

    static async listarTodas() {
        const query = `
            SELECT t.id_turma, t.codigo_turma, t.periodo_letivo, d.id_disciplina, d.codigo AS codigo_disciplina, d.nome AS nome_disciplina
            FROM Turma t
            JOIN Disciplina d ON t.id_disciplina = d.id_disciplina
            ORDER BY t.periodo_letivo DESC, d.nome ASC
        `;
        const { rows } = await pool.query(query);
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