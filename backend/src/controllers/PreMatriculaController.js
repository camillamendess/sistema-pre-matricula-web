const PreMatriculaService = require('../services/PreMatriculaService');
const AlunoService = require('../services/AlunoService');

class PreMatriculaController {
    static async cadastrar(req, res) {
        try {
            const body = req.body || {};
            const { id_turma } = body;

            if (!id_turma) {
                return res.status(400).json({ erro: 'O campo id_turma e obrigatorio.' });
            }

            const alunoAutenticado = await AlunoService.buscarAlunoPorUsuario(req.usuario.id_usuario);
            const novaMatricula = await PreMatriculaService.realizarPreMatricula(
                parseInt(alunoAutenticado.id_aluno),
                parseInt(id_turma)
            );

            return res.status(201).json({ mensagem: 'Pre-matricula realizada com sucesso!', matricula: novaMatricula });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    static async cadastrarParaAluno(req, res) {
        try {
            const { id_aluno, id_turma } = req.body || {};

            if (!id_aluno || !id_turma) {
                return res.status(400).json({ erro: 'Os campos id_aluno e id_turma sao obrigatorios.' });
            }

            const novaMatricula = await PreMatriculaService.realizarPreMatricula(
                parseInt(id_aluno),
                parseInt(id_turma)
            );

            return res.status(201).json({ mensagem: 'Aluno matriculado com sucesso!', matricula: novaMatricula });
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

    static async listarMinhas(req, res) {
        try {
            const alunoAutenticado = await AlunoService.buscarAlunoPorUsuario(req.usuario.id_usuario);
            const matriculas = await PreMatriculaService.listarPreMatriculasPorAluno(alunoAutenticado.id_aluno);

            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    static async listarPorAluno(req, res) {
        try {
            const { id_aluno } = req.params;
            const matriculas = await PreMatriculaService.listarPreMatriculasPorAluno(parseInt(id_aluno));

            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    static async relatorio(req, res) {
        try {
            const { id_turma, ordenarPor, ordem } = req.query;

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
            return res.status(500).json({ erro: 'Erro interno ao gerar o relatorio do colegiado.' });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            await PreMatriculaService.cancelarPreMatricula(parseInt(id));
            return res.status(200).json({ mensagem: 'Pre-matricula cancelada com sucesso.' });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }
}

module.exports = PreMatriculaController;
