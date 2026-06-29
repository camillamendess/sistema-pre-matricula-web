const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null;

    if (!token) {
        return res.status(401).json({ erro: 'Token de autenticacao nao informado.' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = {
            id_usuario: payload.id_usuario,
            tipo_usuario: payload.tipo_usuario
        };
        return next();
    } catch (error) {
        return res.status(401).json({ erro: 'Token invalido ou expirado.' });
    }
}

function autorizarTipos(...tiposPermitidos) {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({ erro: 'Usuario nao autenticado.' });
        }

        if (!tiposPermitidos.includes(req.usuario.tipo_usuario)) {
            return res.status(403).json({ erro: 'Você não tem permissão para acessar este recurso.' });
        }

        return next();
    };
}

const autorizarAdmin = autorizarTipos(1);
const autorizarAluno = autorizarTipos(2);
const autorizarAutenticado = autorizarTipos(1, 2);

module.exports = {
    autenticarToken,
    autorizarTipos,
    autorizarAdmin,
    autorizarAluno,
    autorizarAutenticado
};
