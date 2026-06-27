const bcrypt = require('bcrypt');
const crypto = require('crypto');
const AlunoModel = require('../models/AlunoModel');
const UsuarioModel = require('../models/UsuarioModel');

class AlunoService {
    static async cadastrarAluno(nome, email, matricula) {
        const usuarioExistente = await UsuarioModel.buscarPorEmail(email);
        if (usuarioExistente) throw new Error('E-mail já está em uso.');

        // Gerar senha inicial aleatória segura
        const senhaInicialAleatoria = crypto.randomBytes(4).toString('hex'); // Ex: 'a7b3c2d1'
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senhaInicialAleatoria, salt);

        // Envia o hash gerado para o Model salvar no banco
        const novoAluno = await AlunoModel.criarAluno(nome, email, matricula, senhaHash);
        return novoAluno;
    }

    static async listarAlunos() {
        return await AlunoModel.listarTodos();
    }

    static async buscarAluno(id_aluno) {
        const aluno = await AlunoModel.buscarPorId(id_aluno);
        if (!aluno) throw new Error('Aluno não encontrado.');
        return aluno;
    }

    static async atualizarAluno(id_aluno, nome, email, matricula) {
        const alunoAtual = await AlunoModel.buscarPorId(id_aluno);
        if (!alunoAtual) throw new Error('Aluno não encontrado.');

        const usuarioExistente = await UsuarioModel.buscarPorEmail(email);
        if (usuarioExistente && usuarioExistente.id_usuario !== alunoAtual.id_usuario) {
            throw new Error('E-mail já está em uso por outra conta.');
        }

        return await AlunoModel.atualizar(id_aluno, nome, email, matricula);
    }

    static async excluirAluno(id_aluno) {
        // Se houver uma matrícula vinculada, o Model disparará o erro relacional do banco
        await AlunoModel.excluir(id_aluno);
    }
}

module.exports = AlunoService;