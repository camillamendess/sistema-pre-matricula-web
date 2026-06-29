const TurmaModel = require('../models/TurmaModel');
const DisciplinaModel = require('../models/DisciplinaModel');

class TurmaService {
    static async cadastrarTurma(id_disciplina, codigo_turma, periodo_letivo) {
        const disciplina = await DisciplinaModel.buscarPorId(id_disciplina);
        if (!disciplina) {
            throw new Error('A disciplina informada nao existe no sistema.');
        }

        const turmaExistente = await TurmaModel.buscarTurmaEspecifica(id_disciplina, codigo_turma, periodo_letivo);
        if (turmaExistente) {
            throw new Error('Ja existe uma turma com este codigo para esta disciplina neste periodo letivo.');
        }

        return await TurmaModel.criar(id_disciplina, codigo_turma, periodo_letivo);
    }

    static async listarTurmas(filtros = {}) {
        return await TurmaModel.listarTodas(filtros);
    }

    static async buscarTurma(id_turma) {
        const turma = await TurmaModel.buscarPorId(id_turma);
        if (!turma) {
            throw new Error('Turma nao encontrada.');
        }
        return turma;
    }

    static async listarAlunosTurma(id_turma) {
        const turma = await TurmaModel.buscarPorId(id_turma);
        if (!turma) {
            throw new Error('Turma nao encontrada.');
        }

        return await TurmaModel.listarAlunos(id_turma);
    }

    static async atualizarTurma(id_turma, id_disciplina, codigo_turma, periodo_letivo) {
        const turmaAtual = await TurmaModel.buscarPorId(id_turma);
        if (!turmaAtual) throw new Error('Turma nao encontrada para atualizacao.');

        const disciplina = await DisciplinaModel.buscarPorId(id_disciplina);
        if (!disciplina) throw new Error('A disciplina informada nao existe.');

        const turmaExistente = await TurmaModel.buscarTurmaEspecifica(id_disciplina, codigo_turma, periodo_letivo);
        if (turmaExistente && turmaExistente.id_turma !== id_turma) {
            throw new Error('Ja existe outra turma registrada com estas mesmas caracteristicas.');
        }

        return await TurmaModel.atualizar(id_turma, id_disciplina, codigo_turma, periodo_letivo);
    }

    static async excluirTurma(id_turma) {
        const deletado = await TurmaModel.excluir(id_turma);
        if (!deletado) {
            throw new Error('Turma nao encontrada para exclusao.');
        }
    }
}

module.exports = TurmaService;
