const bcrypt = require('bcrypt');
const UsuarioModel = require('../models/UsuarioModel');

class UsuarioService {
    static async cadastrarAdmin(nome, email, senha) {
        const usuarioExistente = await UsuarioModel.buscarPorEmail(email);
        if (usuarioExistente) throw new Error('E-mail já cadastrado.');

        // Criptografando a senha do Admin antes de salvar
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        return await UsuarioModel.criarAdmin(nome, email, senhaHash);
    }

    static async listarUsuarios() {
        return await UsuarioModel.listarTodos();
    }

    static async buscarUsuario(id_usuario) {
        const usuario = await UsuarioModel.buscarPorId(id_usuario);
        if (!usuario) throw new Error('Usuário não encontrado.');
        return usuario;
    }

    static async atualizarUsuario(id_usuario, nome, email) {
        const usuarioExistente = await UsuarioModel.buscarPorEmail(email);
        if (usuarioExistente && usuarioExistente.id_usuario !== id_usuario) {
            throw new Error('E-mail já está em uso por outra conta.');
        }
        return await UsuarioModel.atualizar(id_usuario, nome, email);
    }

    static async excluirUsuario(id_usuario) {
        const deletado = await UsuarioModel.excluir(id_usuario);
        if (!deletado) throw new Error('Usuário não encontrado para exclusão.');
    }
}

module.exports = UsuarioService;