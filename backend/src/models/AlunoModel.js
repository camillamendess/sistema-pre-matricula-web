const pool = require('../config/database');

class AlunoModel {
    static async criarAluno(nome, email, matricula, senhaHash) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            // 1. Cria o usuário já incluindo o hash da senha
            const queryUser = `
                INSERT INTO Usuario (nome, email, senha, tipo_usuario)
                VALUES ($1, $2, $3, 2)
                RETURNING id_usuario, nome, email, tipo_usuario
            `;
            const resUser = await client.query(queryUser, [nome, email, senhaHash]);
            const usuario = resUser.rows[0];

            // 2. Cria o aluno associado
            const queryAluno = `
                INSERT INTO Aluno (id_usuario, matricula)
                VALUES ($1, $2)
                RETURNING id_aluno, matricula
            `;
            const resAluno = await client.query(queryAluno, [usuario.id_usuario, matricula]);
            const aluno = resAluno.rows[0];

            await client.query('COMMIT');
            return { ...usuario, ...aluno };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async listarTodos(filtros = {}) {
        const conditions = ['u.tipo_usuario = 2'];
        const values = [];

        if (filtros.nome) {
            values.push(`%${filtros.nome}%`);
            conditions.push(`u.nome ILIKE $${values.length}`);
        }

        if (filtros.email) {
            values.push(`%${filtros.email}%`);
            conditions.push(`u.email ILIKE $${values.length}`);
        }

        if (filtros.matricula) {
            values.push(`%${filtros.matricula}%`);
            conditions.push(`a.matricula ILIKE $${values.length}`);
        }

        const query = `
            SELECT u.id_usuario, u.nome, u.email, u.tipo_usuario, a.id_aluno, a.matricula
            FROM Aluno a
            JOIN Usuario u ON a.id_usuario = u.id_usuario
            WHERE ${conditions.join(' AND ')}
            ORDER BY a.id_aluno
        `;
        const { rows } = await pool.query(query, values);
        return rows;
    }

    static async buscarPorId(id_aluno) {
        const query = `
            SELECT u.id_usuario, u.nome, u.email, u.tipo_usuario, a.id_aluno, a.matricula
            FROM Aluno a
            JOIN Usuario u ON a.id_usuario = u.id_usuario
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
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            
            // 1. Descobre o id_usuario vinculado a este aluno
            const resBusca = await client.query('SELECT id_usuario FROM Aluno WHERE id_aluno = $1', [id_aluno]);
            if (resBusca.rowCount === 0) throw new Error('Aluno não encontrado.');
            const id_usuario = resBusca.rows[0].id_usuario;

            // 2. Atualiza Usuario e Aluno
            await client.query('UPDATE Usuario SET nome = $1, email = $2 WHERE id_usuario = $3', [nome, email, id_usuario]);
            await client.query('UPDATE Aluno SET matricula = $1 WHERE id_aluno = $2', [matricula, id_aluno]);

            await client.query('COMMIT');
            return { id_aluno, id_usuario, nome, email, matricula, tipo_usuario: 2 };
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
            if (resBusca.rowCount === 0) throw new Error('Aluno não encontrado.');
            const id_usuario = resBusca.rows[0].id_usuario;

            // Para respeitar a integridade, deletamos a tabela filha (Aluno) e depois a pai (Usuario)
            await client.query('DELETE FROM Aluno WHERE id_aluno = $1', [id_aluno]);
            await client.query('DELETE FROM Usuario WHERE id_usuario = $1', [id_usuario]);

            await client.query('COMMIT');
            return true;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error; // O erro será disparado se houver matrículas ativas vinculadas ao aluno
        } finally {
            client.release();
        }
    }

    static async buscarMatriculas(id_aluno) {
        const queryMatriculas = `
            SELECT 
                pm.id_pre_matricula, 
                pm.data_solicitacao,
                t.id_turma, 
                t.codigo_turma, 
                t.periodo_letivo,
                d.codigo AS codigo_disciplina,
                d.nome AS nome_disciplina, 
                d.departamento
            FROM Pre_Matricula pm
            JOIN Turma t ON pm.id_turma = t.id_turma
            JOIN Disciplina d ON t.id_disciplina = d.id_disciplina
            WHERE pm.id_aluno = $1
            ORDER BY pm.data_solicitacao DESC
        `;
        
        const { rows } = await pool.query(queryMatriculas, [id_aluno]);
        
        return rows;
    }
}

module.exports = AlunoModel;
