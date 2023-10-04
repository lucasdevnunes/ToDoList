const { db } = require('../bancodedados');
const { tarefas } = db;
const { feitas, porFazer } = tarefas;
const { format } = require('date-fns');
let { geradorDeIdDaTarefa } = require('../bancodedados');
const { buscarConta } = require('../intermediarios')

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
    const usuario = buscarConta(id)
    const { titulo, descricao } = req.body;
    try {

        if (titulo && descricao) {
            let data = format(new Date(), "dd/MM/yyyy HH:mm:ss")
            porFazer.push({
                id,
                idDaTarefa: usuario[0].contadorTarefas,
                titulo,
                descricao,
                feito: false,
                dataDeCriacao: data
            })
            usuario[0].contadorTarefas += 1;
            return res.status(201).json({ "menssagem": "Tarefa adicionada com sucesso." })
        }
        else {
            return res.status(400).json({ "menssagem": "Para adicionar uma terefa é necessario informar título e descrição da tarefa." });
        }
    } catch (error) {
        return res.status(500).json({ "menssagem": "Erro do servidor." });
    }
}

function atualizarTarefa(req, res) {
    let { titulo, descricao, feito } = req.body;
    let { id } = req.params;
    id = Number(id);
    let { idDaTarefa } = req.query;
    idDaTarefa = Number(idDaTarefa);
    try {
        if (titulo && descricao && feito) {
            const buscaIdFeitas = feitas.filter((feita) => {
                return feita.id === id && feita.idDaTarefa === idDaTarefa;
            })
            const buscaIdPorFazer = porFazer.filter((porFazer) => {
                return porFazer.id === id && porFazer.idDaTarefa === idDaTarefa;
            })
            console.log(feitas, porFazer);
            if (buscaIdFeitas.length === 1 || buscaIdPorFazer.length === 1) {
                if (buscaIdFeitas.length === 1) {
                    buscaIdFeitas[0].titulo = titulo;
                    buscaIdFeitas[0].descricao = descricao;
                    if (feito === 'true' || feito === 'false') {
                        if (feito === 'false') {
                            feito = false;
                            buscaIdFeitas[0].feito = feito;
                            const indiceDaTarefa = feitas.indexOf((feita) => {
                                return feita.idDaTarefa === idDaTarefa;
                            })
                            feitas.splice(indiceDaTarefa, 1);
                            porFazer.push(buscaIdFeitas[0])
                            return res.status(200).json({ "menssagem": "Tarefa atualizada com sucesso." });
                        }
                        else {
                            feito = false;
                            buscaIdFeitas[0].feito = feito;
                            return res.status(200).json({ "menssagem": "Tarefa atualizada com sucesso." });
                        }
                    }
                    else {
                        return res.status(400).json({ "menssagem": "O valor de 'feito' deve ser true ou false." })
                    }

                }
                if (buscaIdPorFazer.length === 1) {
                    buscaIdPorFazer[0].titulo = titulo;
                    buscaIdPorFazer[0].descricao = descricao;
                    if (feito === 'true' || feito === 'false') {
                        if (feito === 'true') {
                            console.log(1);
                            feito = true;
                            console.log(2);
                            buscaIdPorFazer[0].feito = feito;
                            console.log(3);
                            const indiceDaTarefa = feitas.indexOf((feita) => {
                                return feita.idDaTarefa === idDaTarefa;
                            })
                            console.log(4);
                            porFazer.splice(indiceDaTarefa, 1);
                            console.log(5);
                            feitas.push(buscaIdPorFazer[0])
                            console.log(6);
                            console.log(feitas, porFazer);
                            return res.status(200).json({ "menssagem": "Tarefa atualizada com sucesso." });
                        }
                        else {
                            feito = false;
                            buscaIdPorFazer[0].feito = feito;
                            console.log(feitas, porFazer);
                            return res.status(200).json({ "menssagem": "Tarefa atualizada com sucesso." });
                        }
                    }
                    else {
                        return res.status(400).json({ "menssagem": "O valor de 'feito' deve ser true ou false." })
                    }
                }
            }
            else {
                return res.status(401).json({ "menssagem": "Tarefa não encontrada." });
            }
        }
        else {
            return res.status(400).json({ "menssagem": "Para alterar uma terefa é necessario informar título, descrição e feito (status true ou false)" });
        }
    } catch (error) {
        return res.status(500).json({ "menssagem": "Erro do servidor" });
    }

}

module.exports = {
    visualizarTarefas,
    adicionarTarefa,
    atualizarTarefa
}
