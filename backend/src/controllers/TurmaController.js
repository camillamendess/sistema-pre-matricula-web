const TurmaService = require('../services/TurmaService');

class TurmaController {
    static async cadastrar(req, res) {
        try {
            const { id_disciplina, codigo_turma, periodo_letivo } = req.body;

            if (!id_disciplina || !codigo_turma || !periodo_letivo) {
                return res.status(400).json({ erro: 'Os campos id_disciplina, codigo_turma e periodo_letivo são obrigatórios.' });
            }

            const novaTurma = await TurmaService.cadastrarTurma(parseInt(id_disciplina), codigo_turma, periodo_letivo);
            return res.status(201).json({ mensagem: 'Turma cadastrada com sucesso!', turma: novaTurma });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    static async listar(req, res) {
        try {
            const turmas = await TurmaService.listarTurmas();
            return res.status(200).json(turmas);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    static async buscar(req, res) {
        try {
            const { id } = req.params;
            const turma = await TurmaService.buscarTurma(parseInt(id));
            return res.status(200).json(turma);
        } catch (error) {
            return res.status(404).json({ erro: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { id_disciplina, codigo_turma, periodo_letivo } = req.body;

            if (!id_disciplina || !codigo_turma || !periodo_letivo) {
                return res.status(400).json({ erro: 'Todos os campos são obrigatórios para atualização.' });
            }

            const turmaAtualizada = await TurmaService.atualizarTurma(parseInt(id), parseInt(id_disciplina), codigo_turma, periodo_letivo);
            return res.status(200).json({ mensagem: 'Turma atualizada com sucesso!', turma: turmaAtualizada });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            await TurmaService.excluirTurma(parseInt(id));
            return res.status(200).json({ mensagem: 'Turma excluída com sucesso.' });
        } catch (error) {
            return res.status(400).json({ erro: 'Não foi possível excluir a turma. Verifique se há matrículas vinculadas.' });
        }
    }
}

module.exports = TurmaController;