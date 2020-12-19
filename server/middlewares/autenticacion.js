const jwt = require('jsonwebtoken');

/* Verificar token */
let verificaToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

/* Verifica admin_role */
let verificaAdmin_Role = (req, res, next) => {
    if (req.usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    }
    return res.json({
        ok: false,
        err: {
            message: 'Necesitas ser administrador'
        }
    });
};

module.exports = {
    verificaToken,
    verificaAdmin_Role
};