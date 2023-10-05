const { db } = require('../bancodedados');
let { geradorDeId } = require('../bancodedados');
const { usuarios } = db;
const { buscarConta } = require('../intermediarios');

function listarUsuarios(req, res) {
    try {
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ "menssagem": "Erro do servidor." });
    }
}

function adicionarUsuario(req, res) {
    const { email, senha } = req.body;
    try {
        if (!email || !senha) {
            return res.status(400).json({ "menssagem": "É necessario informar email e senha para adicionar uma nova conta." });
        }
        usuarios.push({
            id: geradorDeId,
            contadorTarefas: 1,
            email,
            senha
        })
        geradorDeId += 1;
        return res.status(201).json({ "menssagem": "Usuário adicionado com sucesso." });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "menssagem": "Erro do servidor." });
    }
}

function excluirUsuario(req, res) {
    let { id } = req.params;
    id = Number(id)
    const usuario = buscarConta(id)
    const indiceUsuario = usuarios.indexOf(usuario);
    usuarios.splice(indiceUsuario - 1, 1);
    return res.status(200).json({ "menssagem": "Usuário excluido com sucesso." })
}

module.exports = {
    listarUsuarios,
    adicionarUsuario,
    excluirUsuario
}