const express = require('express');
const rotas = express();
const { validadorAdmin, verificadorEmail, validadorEmail, verificadorDeId, verificadorSenha } = require('./intermediarios');
const { listarUsuarios, adicionarUsuario, excluirUsuario } = require('./controladores/usuarios');
const { visualizarTarefas, adicionarTarefa } = require('./controladores/tarefas');

rotas.get('/usuarios', validadorAdmin, listarUsuarios);
rotas.post('/usuarios/adicionar', verificadorEmail, validadorEmail, adicionarUsuario);
rotas.delete('/usuarios/:id/excluir', verificadorDeId, verificadorSenha, excluirUsuario);
rotas.get('/tarefas/:id', verificadorDeId, verificadorSenha, visualizarTarefas);
rotas.post('/tarefas/:id/adicionar', verificadorDeId, verificadorSenha, adicionarTarefa)
rotas.patch('/tarefas/:id/atualizar')
rotas.delete('/tarefas/:id/excluir')
rotas.get('/tarefas/:id/feitas')
rotas.get('/tarefas/:id/porFazer')

module.exports = rotas;