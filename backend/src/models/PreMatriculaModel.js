const pool = require('../config/database');

class PreMatriculaModel {
    static async criar(id_aluno, id_turma) {
        const query = `
            INSERT INTO Pre_Matricula (id_aluno, id_turma)
            VALUES ($1, $2)
            RETURNING *
        `;
        const { rows } = await pool.query(query, [id_aluno, id_turma]);
        return rows[0];
    }

    static async verificarDuplicidade(id_aluno, id_turma) {
        const query = 'SELECT * FROM Pre_Matricula WHERE id_aluno = $1 AND id_turma = $2';
        const { rows } = await pool.query(query, [id_aluno, id_turma]);
        return rows[0];
    }

    static async listarTodas() {
        // Um super JOIN para trazer o nome do aluno e da disciplina
        const query = `
            SELECT pm.id_pre_matricula, pm.data_solicitacao,
            a.id_aluno, u.nome AS nome_aluno, a.matricula,
            t.id_turma, t.codigo_turma, t.periodo_letivo,
            d.nome AS nome_disciplina
            FROM Pre_Matricula pm
            JOIN Aluno a ON pm.id_aluno = a.id_aluno
            JOIN Usuario u ON a.id_usuario = u.id_usuario
            JOIN Turma t ON pm.id_turma = t.id_turma
            JOIN Disciplina d ON t.id_disciplina = d.id_disciplina
            ORDER BY pm.data_solicitacao DESC
        `;
        const { rows } = await pool.query(query);
        return rows;
    }

    static async excluir(id_pre_matricula) {
        const query = 'DELETE FROM Pre_Matricula WHERE id_pre_matricula = $1 RETURNING id_pre_matricula';
        const { rows } = await pool.query(query, [id_pre_matricula]);
        return rows[0];
    }

    // RELATÓRIO DINÂMICO
    static async gerarRelatorioTurmas(id_turma = null, ordenarPor = 'disciplina', ordem = 'ASC') {
        // Proteção contra SQL Injection: Validação estrita (Whitelist)
        const direcaoOrdem = ordem.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        const colunaOrdem = ordenarPor === 'alunos' ? 'quantidade_alunos' : 'd.nome';

        let query = `
            SELECT t.id_turma, t.codigo_turma, t.periodo_letivo, d.nome AS nome_disciplina, d.departamento,
            COUNT(pm.id_aluno) AS quantidade_alunos
            FROM Turma t
            JOIN Disciplina d ON t.id_disciplina = d.id_disciplina
            LEFT JOIN Pre_Matricula pm ON t.id_turma = pm.id_turma
        `;

        const values = [];

        // Se o usuário selecionou uma turma específica, adicionamos o filtro WHERE
        if (id_turma) {
            query += ` WHERE t.id_turma = $1 `;
            values.push(id_turma);
        }

        // Agrupamento necessário devido ao uso do COUNT()
        query += `
            GROUP BY t.id_turma, t.codigo_turma, t.periodo_letivo, d.nome, d.departamento
            ORDER BY ${colunaOrdem} ${direcaoOrdem}
        `;

        const { rows } = await pool.query(query, values);
        return rows;
    }
}

module.exports = PreMatriculaModel;