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

    static async listarTodas() {
        const query = 'SELECT * FROM Disciplina ORDER BY id_disciplina';
        const { rows } = await pool.query(query);
        return rows;
    }

    static async buscarPorId(id_disciplina) {
        const query = 'SELECT * FROM Disciplina WHERE id_disciplina = $1';
        const { rows } = await pool.query(query, [id_disciplina]);
        return rows[0];
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