const AlunoModel = require('../models/AlunoModel');
const UsuarioModel = require('../models/UsuarioModel');

class AlunoService {
    static async cadastrarAluno(nome, email, matricula) {
        if (!nome || !email || !matricula) {
            throw new Error('Nome, e-mail e matricula sao obrigatorios.');
        }

        const usuarioExistente = await UsuarioModel.buscarPorEmail(email);
        if (usuarioExistente) throw new Error('E-mail ja esta em uso.');

        const alunoExistente = await AlunoModel.buscarPorEmail(email);
        if (alunoExistente) throw new Error('E-mail ja esta em uso.');

        return await AlunoModel.criarAluno(nome, email, matricula);
    }

    static async listarAlunos(filtros = {}) {
        return await AlunoModel.listarTodos(filtros);
    }

    static async buscarAluno(id_aluno) {
        const aluno = await AlunoModel.buscarPorId(id_aluno);
        if (!aluno) throw new Error('Aluno nao encontrado.');
        return aluno;
    }

    static async buscarAlunoPorUsuario(id_usuario) {
        const aluno = await AlunoModel.buscarPorUsuarioId(id_usuario);
        if (!aluno) throw new Error('Aluno nao encontrado para o usuario autenticado.');
        return aluno;
    }

    static async atualizarAluno(id_aluno, nome, email, matricula) {
        const alunoAtual = await AlunoModel.buscarPorId(id_aluno);
        if (!alunoAtual) throw new Error('Aluno nao encontrado.');

        const usuarioExistente = await UsuarioModel.buscarPorEmail(email);
        const alunoExistente = await AlunoModel.buscarPorEmail(email);

        if (usuarioExistente && usuarioExistente.id_usuario !== alunoAtual.id_usuario) {
            throw new Error('E-mail ja esta em uso por outra conta.');
        }

        if (alunoExistente && alunoExistente.id_aluno !== alunoAtual.id_aluno) {
            throw new Error('E-mail ja esta em uso por outra conta.');
        }

        return await AlunoModel.atualizar(id_aluno, nome, email, matricula);
    }

    static async excluirAluno(id_aluno) {
        await AlunoModel.excluir(id_aluno);
    }
}

module.exports = AlunoService;
