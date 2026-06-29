const AuthService = require('../services/AuthService');

class AuthController {
    static async login(req, res) {
        try {
            const { email, senha } = req.body;

            // Validação básica se os campos foram enviados
            if (!email || !senha) {
                return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
            }

            const resultado = await AuthService.login(email, senha);
            
            // Retorna o token JWT e os dados públicos do usuário se o login der certo
            return res.status(200).json(resultado);
        } catch (error) {
            // Em caso de credenciais erradas, o status ideal é 401 (Unauthorized)
            return res.status(401).json({ erro: error.message });
        }
    }

    static async primeiroAcesso(req, res) {
        try {
            const { email } = req.body;
            
            if (!email) {
                return res.status(400).json({ erro: 'O campo e-mail é obrigatório.' });
            }

            // O service agora lida com toda a lógica de gerar a senha e atualizar o banco
            const resultado = await AuthService.primeiroAcesso(email);
            
            return res.status(200).json(resultado);
        } catch (error) {
            // Em caso de erro (ex: e-mail não cadastrado), retorna status 400 (Bad Request)
            return res.status(400).json({ erro: error.message });
        }
    }

    static async definirSenha(req, res) {
        try {
            const { acesso, senha } = req.body;
            const resultado = await AuthService.definirSenha(acesso, senha);

            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }
}

module.exports = AuthController;
