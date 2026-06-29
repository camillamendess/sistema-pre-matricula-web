const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const UsuarioModel = require('../models/UsuarioModel');
const AlunoModel = require('../models/AlunoModel');

class AuthService {
    static async login(email, senha) {
        const usuario = await UsuarioModel.buscarPorEmail(email);

        if (!usuario) {
            throw new Error('Usuario nao encontrado.');
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error('Credenciais invalidas.');
        }

        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, tipo_usuario: usuario.tipo_usuario },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        let dadosExtras = {};
        let matriculasDoAluno = [];

        // Se o usuário for um aluno (tipo_usuario = 2), buscamos os dados dele e suas matrículas ativas
        if (usuario.tipo_usuario === 2) {
            const aluno = await AlunoModel.buscarPorUsuarioId(usuario.id_usuario);
            
            // Adicionamos as informações exclusivas da tabela Aluno
            dadosExtras = {
                id_aluno: aluno.id_aluno,
                matricula: aluno.matricula
            };

            matriculasDoAluno = await AlunoModel.buscarMatriculas(aluno.id_aluno);
        }

        return {
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email,
                tipo_usuario: usuario.tipo_usuario,
                ...dadosExtras, // Espalha id_aluno e matricula (se for aluno)
                matriculas: matriculasDoAluno // Array com as disciplinas ou vazio
            }
        };
    }

    static async primeiroAcesso(email) {
        const aluno = await AlunoModel.buscarPorEmail(email);

        if (!aluno) {
            throw new Error('E-mail nao encontrado no cadastro de alunos.');
        }

        let usuario = null;

        if (aluno.id_usuario) {
            usuario = await UsuarioModel.buscarPorId(aluno.id_usuario);
        }

        if (!usuario) {
            usuario = await UsuarioModel.buscarPorEmail(email);
        }

        if (!usuario) {
            const senhaInicial = crypto.randomBytes(24).toString('hex');
            const salt = await bcrypt.genSalt(10);
            const senhaHash = await bcrypt.hash(senhaInicial, salt);
            usuario = await UsuarioModel.criarAluno(aluno.nome, aluno.email, senhaHash);
        }

        if (usuario.tipo_usuario !== 2) {
            throw new Error('Este e-mail nao pertence a um cadastro de aluno.');
        }

        if (!aluno.id_usuario) {
            await AlunoModel.vincularUsuario(aluno.id_aluno, usuario.id_usuario);
        }

        const acesso = jwt.sign(
            { id_usuario: usuario.id_usuario, finalidade: 'definir_senha' },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        );

        return {
            mensagem: 'Cadastro encontrado. Defina sua senha para concluir o primeiro acesso.',
            acesso
        };
    }

    static async definirSenha(acesso, senha) {
        if (!acesso) {
            throw new Error('Acesso temporario nao informado.');
        }

        if (!senha || senha.length < 8) {
            throw new Error('A senha deve ter no minimo 8 caracteres.');
        }

        let payload;
        try {
            payload = jwt.verify(acesso, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error('Acesso expirado ou invalido. Solicite o primeiro acesso novamente.');
        }

        if (payload.finalidade !== 'definir_senha') {
            throw new Error('Acesso temporario invalido.');
        }

        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        await UsuarioModel.atualizarSenha(payload.id_usuario, senhaHash);

        return {
            mensagem: 'Senha definida com sucesso. Voce ja pode fazer login.'
        };
    }
}

module.exports = AuthService;
