const TurmaModel = require('../models/TurmaModel');
const DisciplinaModel = require('../models/DisciplinaModel');

class TurmaService {
    static async cadastrarTurma(id_disciplina, codigo_turma, periodo_letivo) {
        // 1. Verifica se a disciplina informada existe
        const disciplina = await DisciplinaModel.buscarPorId(id_disciplina);
        if (!disciplina) {
            throw new Error('A disciplina informada não existe no sistema.');
        }

        // 2. Verifica se a turma já existe neste mesmo período letivo para esta disciplina
        const turmaExistente = await TurmaModel.buscarTurmaEspecifica(id_disciplina, codigo_turma, periodo_letivo);
        if (turmaExistente) {
            throw new Error('Já existe uma turma com este código para esta disciplina neste período letivo.');
        }

        return await TurmaModel.criar(id_disciplina, codigo_turma, periodo_letivo);
    }

    static async listarTurmas(filtros = {}) {
        return await TurmaModel.listarTodas(filtros);
    }

    static async buscarTurma(id_turma) {
        const turma = await TurmaModel.buscarPorId(id_turma);
        if (!turma) {
            throw new Error('Turma não encontrada.');
        }
        return turma;
    }

    static async atualizarTurma(id_turma, id_disciplina, codigo_turma, periodo_letivo) {
        const turmaAtual = await TurmaModel.buscarPorId(id_turma);
        if (!turmaAtual) throw new Error('Turma não encontrada para atualização.');

        // Verifica se a nova disciplina existe
        const disciplina = await DisciplinaModel.buscarPorId(id_disciplina);
        if (!disciplina) throw new Error('A disciplina informada não existe.');

        // Verifica regra de duplicação
        const turmaExistente = await TurmaModel.buscarTurmaEspecifica(id_disciplina, codigo_turma, periodo_letivo);
        if (turmaExistente && turmaExistente.id_turma !== id_turma) {
            throw new Error('Já existe outra turma registrada com estas mesmas características.');
        }

        return await TurmaModel.atualizar(id_turma, id_disciplina, codigo_turma, periodo_letivo);
    }

    static async excluirTurma(id_turma) {
        const deletado = await TurmaModel.excluir(id_turma);
        if (!deletado) {
            throw new Error('Turma não encontrada para exclusão.');
        }
    }
}

module.exports = TurmaService;
