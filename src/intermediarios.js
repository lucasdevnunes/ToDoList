const { db } = require('./bancodedados');
const { usuarios } = db;

function validadorAdmin(req, res, next) {
    const { admin, senha } = req.query;
    if (admin && senha) {
        if (admin === 'admin' && senha === 'admin') {
            next();
        }
        else {
            return res.status(401).json({ "menssagem": "Conta e/ou senha incorreta(s)." })
        }
    }
    else {
        return res.status(401).json({ "menssagem": "Para acessar estas informações é necessario estar logado como administrador." })
    }
}

function verificadorEmail(req, res, next) {
    const { email } = req.body;
    const emailExistente = usuarios.some((usuario) => {
        return usuario.email === email;
    })
    if (emailExistente) {
        return res.status(400).json({ "menssagem": "Email já cadastrado." })
    }
    else {
        next();
    }
}

function validadorEmail(req, res, next) {
    const { email } = req.body;
    const partes = email.split('@');
    if (partes.length === 2) {
        const temPonto = partes[1].indexOf('.');
        if (temPonto !== -1 && temPonto !== 0 && temPonto !== partes[1].length - 1) {
            if (partes[0].length !== 0) {
                next();
            }
        }
        else {
            return res.status(400).json({ "menssagem": "Email inválido." });
        }
    }
    else {
        return res.status(400).json({ "menssagem": "Email inválido." });
    }
}

function verificadorSenha(req, res, next) {
    let { id } = req.params
    id = Number(id);
    const usuario = buscarConta(id)
    let { senha } = req.query;
    if (usuario[0].senha === senha) {
        next();
    }
    else {
        return res.status(400).json({ "menssagem": "Senha incorreta." });
    }
}

function verificadorDeId(req, res, next) {
    let { id } = req.params;
    id = Number(id);
    const usuarioExistente = usuarios.some((usuario) => {
        return usuario.id === id;
    })
    if (usuarioExistente) {
        next();
    }
    else {
        return res.status(400).json({ "menssagem": "Id de usuário inexistente." });
    }
}

function buscarConta(id) {
    const usuarioEncontrado = usuarios.filter((usuario) => {
        return usuario.id === id;
    })
    if (usuarioEncontrado) {
        return usuarioEncontrado;
    }
    else {
        return res.status(400).json({ "menssagem": "Id de usuário inexistente." });
    }
}

module.exports = {
    validadorAdmin,
    verificadorEmail,
    validadorEmail,
    verificadorSenha,
    verificadorDeId,
    buscarConta
}