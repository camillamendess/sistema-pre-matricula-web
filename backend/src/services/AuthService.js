const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const UsuarioModel = require('../models/UsuarioModel');
const AlunoModel = require('../models/AlunoModel'); // Importado para pegar o id_aluno
const pool = require('../config/database'); // Importado para rodar a query das matrículas

class AuthService {
    static async login(email, senha) {
        const usuario = await UsuarioModel.buscarPorEmail(email);
        
        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }

        // O bcrypt compara a senha digitada com o hash guardado no banco
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error('Credenciais inválidas.');
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
                tipo_usuario: usuario.tipo_usuario,
                ...dadosExtras, // Espalha id_aluno e matricula (se for aluno)
                matriculas: matriculasDoAluno // Array com as disciplinas ou vazio
            }
        };
    }

    static async primeiroAcesso(email) {
        const usuario = await UsuarioModel.buscarPorEmail(email);
        
        if (!usuario) {
            throw new Error('E-mail não encontrado na base de dados da instituição.');
        }
        
        // Gera uma nova senha curta legível para o aluno usar (ex: 6 caracteres)
        const senhaGerada = crypto.randomBytes(3).toString('hex'); // Ex: 'f2d5b1'

        // Gera o hash desta nova senha para atualizar no banco
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senhaGerada, salt);

        // Substitui a senha antiga pela nova senha criptografada
        await UsuarioModel.atualizarSenha(usuario.id_usuario, senhaHash);
        
        // Simulação do disparo do e-mail institucional
        console.log(`
            [EMAIL SIMULADO VIA NODE]
            Para: ${email}
            Assunto: Suas Credenciais de Acesso - Sistema de Pré-Matrícula
            Mensagem: Olá ${usuario.nome}, o seu primeiro acesso foi registado.
            A sua senha temporária gerada pelo sistema é: ${senhaGerada}
            Faça login com suas credenciais.
        `);

        return {
            mensagem: 'Credenciais geradas com sucesso e enviadas para o e-mail institucional.',
            senha_gerada: senhaGerada
        };
    }
}

module.exports = AuthService;