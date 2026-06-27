const AlunoService = require('../services/AlunoService');

class AlunoController {
    static async cadastrar(req, res) {
        try {
            const { nome, email, matricula } = req.body;
            const novoAluno = await AlunoService.cadastrarAluno(nome, email, matricula);
            return res.status(201).json({ mensagem: 'Aluno cadastrado com sucesso!', aluno: novoAluno });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    static async listar(req, res) {
        try {
            const alunos = await AlunoService.listarAlunos();
            return res.status(200).json(alunos);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    static async buscar(req, res) {
        try {
            const { id } = req.params;
            const aluno = await AlunoService.buscarAluno(parseInt(id));
            return res.status(200).json(aluno);
        } catch (error) {
            return res.status(404).json({ erro: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, matricula } = req.body;
            const alunoAtualizado = await AlunoService.atualizarAluno(parseInt(id), nome, email, matricula);
            return res.status(200).json({ mensagem: 'Aluno atualizado!', aluno: alunoAtualizado });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            await AlunoService.excluirAluno(parseInt(id));
            return res.status(200).json({ mensagem: 'Aluno excluído com sucesso.' });
        } catch (error) {
            return res.status(400).json({ erro: 'Não foi possível excluir o aluno. Verifique se há matrículas vinculadas.' });
        }
    }
}

module.exports = AlunoController;