const DisciplinaModel = require('../models/DisciplinaModel');

class DisciplinaService {
    static async cadastrarDisciplina(codigo, nome, creditos, departamento) {
        const disciplinaExistente = await DisciplinaModel.buscarPorCodigo(codigo);
        if (disciplinaExistente) {
            throw new Error('Ja existe uma disciplina cadastrada com este codigo.');
        }

        return await DisciplinaModel.criar(codigo, nome, creditos, departamento);
    }

    static async listarDisciplinas(filtros = {}) {
        return await DisciplinaModel.listarTodas(filtros);
    }

    static async buscarDisciplina(id_disciplina) {
        const disciplina = await DisciplinaModel.buscarPorId(id_disciplina);
        if (!disciplina) {
            throw new Error('Disciplina nao encontrada.');
        }
        return disciplina;
    }

    static async listarAlunosDisciplina(id_disciplina) {
        const disciplina = await DisciplinaModel.buscarPorId(id_disciplina);
        if (!disciplina) {
            throw new Error('Disciplina nao encontrada.');
        }

        return await DisciplinaModel.listarAlunos(id_disciplina);
    }

    static async atualizarDisciplina(id_disciplina, codigo, nome, creditos, departamento) {
        const disciplinaAtual = await DisciplinaModel.buscarPorId(id_disciplina);
        if (!disciplinaAtual) {
            throw new Error('Disciplina nao encontrada para atualizacao.');
        }

        const disciplinaComCodigo = await DisciplinaModel.buscarPorCodigo(codigo);
        if (disciplinaComCodigo && disciplinaComCodigo.id_disciplina !== id_disciplina) {
            throw new Error('Este codigo de disciplina ja esta em uso por outro componente.');
        }

        return await DisciplinaModel.atualizar(id_disciplina, codigo, nome, creditos, departamento);
    }

    static async excluirDisciplina(id_disciplina) {
        const deletado = await DisciplinaModel.excluir(id_disciplina);
        if (!deletado) {
            throw new Error('Disciplina nao encontrada para exclusao.');
        }
    }
}

module.exports = DisciplinaService;
