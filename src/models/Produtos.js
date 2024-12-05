/**
 * Modelo de dados(Clientes)
 */

//Importação de bivliotecas
const {model, schema, Schema} = require ('mongoose')

//Crição da estrutura de dados ("tabela") que será usada no banco 
const produtosSchema = new Schema ({
    nomeProdutos:{
        type: String
    },
    precoProdutos:{
        type: String
    },
    codigoProdutos:{
        type: String
    }
})

//exportar para o main
// Para modificar o nome da coleção ("tabela"), basta, modificar na a linha abaixo o rotulo 'Clientes', sempre iniciando com letra maiuscula
module.exports = model('Produtos', produtosSchema)