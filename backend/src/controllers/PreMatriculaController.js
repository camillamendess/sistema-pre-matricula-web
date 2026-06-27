const PreMatriculaService = require('../services/PreMatriculaService');

class PreMatriculaController {
    static async cadastrar(req, res) {
        try {
            const body = req.body || {};
            const { id_aluno, id_turma } = body;

            if (!id_aluno || !id_turma) {
                return res.status(400).json({ erro: 'Os campos id_aluno e id_turma são obrigatórios.' });
            }

            const novaMatricula = await PreMatriculaService.realizarPreMatricula(parseInt(id_aluno), parseInt(id_turma));
            return res.status(201).json({ mensagem: 'Pré-matrícula realizada com sucesso!', matricula: novaMatricula });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    static async listar(req, res) {
        try {
            const matriculas = await PreMatriculaService.listarPreMatriculas();
            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    static async relatorio(req, res) {
        try {
            const { id_turma, ordenarPor, ordem } = req.query;

            // Tratamento e conversão dos dados recebidos
            const filtroTurma = id_turma ? parseInt(id_turma) : null;
            const parametroOrdenarPor = ordenarPor === 'alunos' ? 'alunos' : 'disciplina';
            const parametroOrdem = ordem?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

            const dadosRelatorio = await PreMatriculaService.relatorioColegiado(
                filtroTurma,
                parametroOrdenarPor,
                parametroOrdem
            );

            return res.status(200).json(dadosRelatorio);
        } catch (error) {
            return res.status(500).json({ erro: 'Erro interno ao gerar o relatório do colegiado.' });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            await PreMatriculaService.cancelarPreMatricula(parseInt(id));
            return res.status(200).json({ mensagem: 'Pré-matrícula cancelada com sucesso.' });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }
}

module.exports = PreMatriculaController;