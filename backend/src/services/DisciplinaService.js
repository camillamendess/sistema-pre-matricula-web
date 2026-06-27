const DisciplinaModel = require('../models/DisciplinaModel');

class DisciplinaService {
    static async cadastrarDisciplina(codigo, nome, creditos, departamento) {
        const disciplinaExistente = await DisciplinaModel.buscarPorCodigo(codigo);
        if (disciplinaExistente) {
            throw new Error('Já existe uma disciplina cadastrada com este código.');
        }

        return await DisciplinaModel.criar(codigo, nome, creditos, departamento);
    }

    static async listarDisciplinas() {
        return await DisciplinaModel.listarTodas();
    }

    static async buscarDisciplina(id_disciplina) {
        const disciplina = await DisciplinaModel.buscarPorId(id_disciplina);
        if (!disciplina) {
            throw new Error('Disciplina não encontrada.');
        }
        return disciplina;
    }

    static async atualizarDisciplina(id_disciplina, codigo, nome, creditos, departamento) {
        const disciplinaAtual = await DisciplinaModel.buscarPorId(id_disciplina);
        if (!disciplinaAtual) {
            throw new Error('Disciplina não encontrada para atualização.');
        }

        // Verifica se o novo código já está sendo usado por OUTRA disciplina
        const disciplinaComCodigo = await DisciplinaModel.buscarPorCodigo(codigo);
        if (disciplinaComCodigo && disciplinaComCodigo.id_disciplina !== id_disciplina) {
            throw new Error('Este código de disciplina já está em uso por outro componente.');
        }

        return await DisciplinaModel.atualizar(id_disciplina, codigo, nome, creditos, departamento);
    }

    static async excluirDisciplina(id_disciplina) {
        const deletado = await DisciplinaModel.excluir(id_disciplina);
        if (!deletado) {
            throw new Error('Disciplina não encontrada para exclusão.');
        }
    }
}

module.exports = DisciplinaService;