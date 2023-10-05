README - Projeto To-Do List com JavaScript e Express
Este é um projeto de uma lista de tarefas (To-Do List) desenvolvido utilizando JavaScript e o framework Express. Ele permite que os usuários se cadastrem, criem tarefas, visualizem suas tarefas, alterem o conteúdo das tarefas, marquem as tarefas como concluídas ou pendentes, além de excluir tanto tarefas quanto seus cadastros.

Endpoints (rodando na porta 8000)
Listar Usuários
Rota: GET /usuarios
Descrição: Retorna a lista de todos os usuários cadastrados no sistema. Passando como query o admin e senha (?admin=admin&senha=admin).
Adicionar Usuário
Rota: POST /usuarios/adicionar
Descrição: Permite que um novo usuário seja cadastrado no sistema.
Excluir Usuário
Rota: DELETE /usuarios/:id/excluir
Descrição: Exclui um usuário específico com base no seu ID. Passando como query a senha do usuário (?senha=2).
Visualizar Tarefas
Rota: GET /tarefas/:id
Descrição: Retorna as tarefas associadas a um usuário específico com base em seu ID. Passando como query a senha do usuário (?senha=2).
Adicionar Tarefa
Rota: POST /tarefas/:id/adicionar
Descrição: Permite que um usuário adicione uma nova tarefa ao seu perfil. Passando como query a senha do usuário (?senha=2).
Atualizar Tarefa
Rota: PUT /tarefas/:id/atualizar
Descrição: Permite que um usuário atualize o conteúdo de uma tarefa existente. Passando como query a senha do usuário e o id da tarefa (?senha=2&idaDaTarefa=1).
Excluir Tarefa
Rota: DELETE /tarefas/:id/excluir
Descrição: Exclui uma tarefa específica com base em seu ID. Passando como query a senha do usuário e o id da tarefa (?senha=2&idaDaTarefa=1).
Visualizar Tarefas Feitas
Rota: GET /tarefas/:id/feitas
Descrição: Retorna todas as tarefas marcadas como concluídas pelo usuário com base em seu ID. Passando como query a senha do usuário (?senha=2).
Visualizar Tarefas por Fazer
Rota: GET /tarefas/:id/porFazer
Descrição: Retorna todas as tarefas que estão pendentes (por fazer) para um usuário específico com base em seu ID. Passando como query a senha do usuário (?senha=2).

Instruções de Uso

1 - Clone o repositório deste projeto em sua máquina local.

2 - Instale as dependências necessárias usando o comando:

npm install

3 - Inicie o servidor da aplicação com o comando:

npm start

Utilize as rotas e endpoints descritos acima para interagir com a aplicação To-Do List.

Este projeto foi criado com o intuito de estudo e pode ser modificado para atender às necessidades de um aplicativo de lista de tarefas mais completo. Sinta-se à vontade para contribuir, melhorar e adaptar de acordo com seus objetivos.
