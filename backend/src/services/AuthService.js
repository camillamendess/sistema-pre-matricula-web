const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const UsuarioModel = require('../models/UsuarioModel');

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

        return {
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                tipo_usuario: usuario.tipo_usuario
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