/**
 * Processos de Renderização
 */

//Botões


function fechar() {
    api.fecharJanela()
}

function clientes() {
    api.janelaClientes()
}

function fornecedores() {
    api.janelaFornecedores()
}
function produtos() {
    api.janelaProdutos()
}
function relatorios() {
    api.janelaRelatorios()
}

//inserção da data no rodapé
function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-BR', options)
}
document.getElementById('dataAtual').innerHTML = obterData()

//icone de status do banco de dados
api.dbMensagem((event, message) => {
    //validação e troca do item
    if (message === "conectado") {
        document.getElementById('iconDB').src = "../public/img/dbon.png"
    } else {
        document.getElementById('iconDB').src = "../public/img/dboff.png"
    }
})
