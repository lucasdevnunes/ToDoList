db = {
    usuarios: [],
    tarefas: {
        porFazer: [],
        feitas: []
    }
}

let geradorDeId = 1;

module.exports = {
    db,
    geradorDeId
};