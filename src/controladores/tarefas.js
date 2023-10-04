const { db } = require('../bancodedados');
const { tarefas } = db;
const { feitas, porFazer } = tarefas;
const { format } = require('date-fns');

function visualizarTarefas(req, res) {
    let { id } = req.params;
    id = Number(id);
    const buscaIdFeitas = feitas.filter((feita) => {
        return feita.id === id;
    })
    const buscaIdPorFazer = porFazer.filter((feita) => {
        return feita.id === id;
    })
    const todasAsTarefas = [...buscaIdFeitas, ...buscaIdPorFazer];
    return res.status(200).json(todasAsTarefas);
}

function adicionarTarefa(req, res) {
    let { id } = req.params;
    id = Number(id);
    const { titulo, descricao } = req.body;
    try {
        if (titulo && descricao) {
            let data = format(new Date(), "dd/MM/yyyy HH:mm:ss")
            porFazer.push({
                id,
                titulo,
                descricao,
                feito: false,
                dataDeCriacao: data
            })
            return res.status(201).json({ "menssagem": "Tarefa adicionada com sucesso." })
        }
        else {
            return res.status(400).json({ "menssagem": "Para adicionar uma terefa é necessario informar título e descrição da tarefa." });
        }
    } catch (error) {
        return res.status(500).json({ "menssagem": "Erro do servidor." });
    }
}

module.exports = {
    visualizarTarefas,
    adicionarTarefa
}
