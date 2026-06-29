const DisciplinaService = require('../services/DisciplinaService');

class DisciplinaController {
    static async cadastrar(req, res) {
        try {
            const { codigo, nome, creditos, departamento } = req.body;

            if (!codigo || !nome || creditos === undefined || !departamento) {
                return res.status(400).json({ erro: 'Todos os campos (código, nome, créditos e departamento) são obrigatórios.' });
            }

            const novaDisciplina = await DisciplinaService.cadastrarDisciplina(codigo, nome, parseInt(creditos), departamento);
            return res.status(201).json({ mensagem: 'Disciplina cadastrada com sucesso!', disciplina: novaDisciplina });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    static async listar(req, res) {
        try {
            const { codigo, nome, departamento, creditos } = req.query;
            const creditosNumero = creditos !== undefined ? parseInt(creditos) : undefined;
            const filtros = {
                codigo,
                nome,
                departamento,
                creditos: Number.isNaN(creditosNumero) ? undefined : creditosNumero
            };
            const disciplinas = await DisciplinaService.listarDisciplinas(filtros);
            return res.status(200).json(disciplinas);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    static async buscar(req, res) {
        try {
            const { id } = req.params;
            const disciplina = await DisciplinaService.buscarDisciplina(parseInt(id));
            return res.status(200).json(disciplina);
        } catch (error) {
            return res.status(404).json({ erro: error.message });
        }
    }

    static async listarAlunos(req, res) {
        try {
            const { id } = req.params;
            const alunos = await DisciplinaService.listarAlunosDisciplina(parseInt(id));
            return res.status(200).json(alunos);
        } catch (error) {
            return res.status(404).json({ erro: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { codigo, nome, creditos, departamento } = req.body;

            if (!codigo || !nome || creditos === undefined || !departamento) {
                return res.status(400).json({ erro: 'Todos os campos são obrigatórios para atualização.' });
            }

            const disciplinaAtualizada = await DisciplinaService.atualizarDisciplina(parseInt(id), codigo, nome, parseInt(creditos), departamento);
            return res.status(200).json({ mensagem: 'Disciplina atualizada com sucesso!', disciplina: disciplinaAtualizada });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            await DisciplinaService.excluirDisciplina(parseInt(id));
            return res.status(200).json({ mensagem: 'Disciplina excluída com sucesso.' });
        } catch (error) {
            return res.status(400).json({ erro: 'Não foi possível excluir a disciplina. Verifique se ela está vinculada a alguma turma ativa.' });
        }
    }
}

module.exports = DisciplinaController;
