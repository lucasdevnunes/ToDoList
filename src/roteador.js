const express = require('express');
const rotas = express();
const { validadorAdmin, verificadorEmail, validadorEmail, verificadorDeId, verificadorSenha, verificadorDeIdTarefa } = require('./intermediarios');
const { listarUsuarios, adicionarUsuario, excluirUsuario } = require('./controladores/usuarios');
const { visualizarTarefas, adicionarTarefa, atualizarTarefa } = require('./controladores/tarefas');

rotas.get('/usuarios', validadorAdmin, listarUsuarios);
rotas.post('/usuarios/adicionar', verificadorEmail, validadorEmail, adicionarUsuario);
rotas.delete('/usuarios/:id/excluir', verificadorDeId, verificadorSenha, excluirUsuario);
rotas.get('/tarefas/:id', verificadorDeId, verificadorSenha, visualizarTarefas);
rotas.post('/tarefas/:id/adicionar', verificadorDeId, verificadorSenha, adicionarTarefa)
rotas.put('/tarefas/:id/atualizar', verificadorDeId, verificadorSenha, verificadorDeIdTarefa, atualizarTarefa);
rotas.delete('/tarefas/:id/excluir', verificadorDeId, verificadorSenha, verificadorDeIdTarefa,);
rotas.get('/tarefas/:id/feitas')
rotas.get('/tarefas/:id/porFazer')

module.exports = rotas;