const pool = require('../config/database');

class RelatorioModel {

    static async disciplinasMatriculadas(semestre, ordenarPor = 'nome') {

        let orderBy = 'd.nome ASC';

        if (ordenarPor === 'quantidade') {
            orderBy = 'total_alunos DESC, d.nome ASC';
        }

        const query = `
            SELECT
                d.id_disciplina,
                d.codigo,
                d.nome,
                d.departamento,
                d.creditos,
                COUNT(pm.id_aluno) AS total_alunos
            FROM Disciplina d
            LEFT JOIN Turma t
                ON d.id_disciplina = t.id_disciplina
            LEFT JOIN Pre_Matricula pm
                ON t.id_turma = pm.id_turma
            WHERE t.periodo_letivo = '${semestre}'
            GROUP BY
                d.id_disciplina,
                d.codigo,
                d.nome,
                d.departamento,
                d.creditos
            ORDER BY ${orderBy};
        `;

        const { rows } = await pool.query(query);

        return rows;
    }

}

module.exports = RelatorioModel;