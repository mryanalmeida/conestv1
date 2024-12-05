/**
 * Modelo de dados(Clientes)
 */

//Importação de bivliotecas
const {model, schema, Schema} = require ('mongoose')

//Crição da estrutura de dados ("tabela") que será usada no banco 
const fornecedoresSchema = new Schema ({
    nomeFornecedores:{
        type: String
    },
    foneFornecedores:{
        type: String
    },
    siteFornecedores:{
        type: String
    },
    cepFornecedores:{
        type: String
    },
    logradouroFornecedores:{
        type: String
    },
    bairroFornecedores:{
        type: String
    },
    cidadeFornecedores:{
        type: String
    },
    ufFornecedores:{
        type: String
    },
    numeroFornecedores:{
        type: String
    },
    complementoFornecedores:{
        type: String
    }
})

//exportar para o main
// Para modificar o nome da coleção ("tabela"), basta, modificar na a linha abaixo o rotulo 'Clientes', sempre iniciando com letra maiuscula
module.exports = model('Fornecedores', fornecedoresSchema)