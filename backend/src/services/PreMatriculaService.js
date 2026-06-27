const PreMatriculaModel = require('../models/PreMatriculaModel');
const AlunoModel = require('../models/AlunoModel');
const TurmaModel = require('../models/TurmaModel');

class PreMatriculaService {
    static async realizarPreMatricula(id_aluno, id_turma) {
        // 1. Verifica se o Aluno existe
        const aluno = await AlunoModel.buscarPorId(id_aluno);
        if (!aluno) throw new Error('O aluno informado não existe no sistema.');

        // 2. Verifica se a Turma existe
        const turma = await TurmaModel.buscarPorId(id_turma);
        if (!turma) throw new Error('A turma informada não existe ou está inativa.');

        // 3. Verifica a Duplicidade (Regra do UNIQUE no banco)
        const matriculaExistente = await PreMatriculaModel.verificarDuplicidade(id_aluno, id_turma);
        if (matriculaExistente) {
            throw new Error('Este aluno já está pré-matriculado nesta turma.');
        }

        return await PreMatriculaModel.criar(id_aluno, id_turma);
    }

    static async listarPreMatriculas() {
        return await PreMatriculaModel.listarTodas();
    }

    static async cancelarPreMatricula(id_pre_matricula) {
        const deletado = await PreMatriculaModel.excluir(id_pre_matricula);
        if (!deletado) throw new Error('Pré-matrícula não encontrada para exclusão.');
    }

    static async relatorioColegiado(id_turma, ordenarPor, ordem) {
        return await PreMatriculaModel.gerarRelatorioTurmas(id_turma, ordenarPor, ordem);
    }
}

module.exports = PreMatriculaService;