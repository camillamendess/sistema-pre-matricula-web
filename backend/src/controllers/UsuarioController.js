const UsuarioService = require('../services/UsuarioService');

class UsuarioController {
    static async cadastrarAdmin(req, res) {
        try {
            const { nome, email, senha } = req.body;
            if (!senha) {
                return res.status(400).json({ erro: 'A senha é obrigatória para cadastrar um administrador.' });
            }
            const novoAdmin = await UsuarioService.cadastrarAdmin(nome, email, senha);
            return res.status(201).json({ mensagem: 'Administrador criado!', usuario: novoAdmin });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    static async listar(req, res) {
        try {
            const { nome, email, tipo_usuario } = req.query;
            const tipoUsuarioNumero = tipo_usuario ? parseInt(tipo_usuario) : undefined;
            const filtros = {
                nome,
                email,
                tipo_usuario: Number.isNaN(tipoUsuarioNumero) ? undefined : tipoUsuarioNumero
            };
            const usuarios = await UsuarioService.listarUsuarios(filtros);
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    static async buscar(req, res) {
        try {
            const { id } = req.params;
            const usuario = await UsuarioService.buscarUsuario(parseInt(id));
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(404).json({ erro: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, email } = req.body;
            const atualizado = await UsuarioService.atualizarUsuario(parseInt(id), nome, email);
            return res.status(200).json({ mensagem: 'Usuário atualizado!', usuario: atualizado });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            await UsuarioService.excluirUsuario(parseInt(id));
            return res.status(200).json({ mensagem: 'Usuário excluído com sucesso.' });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }
}

module.exports = UsuarioController;
