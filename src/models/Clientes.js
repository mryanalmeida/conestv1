/**
 * Modelo de Dados (Clientes)
 */

//Importação
const { model, Schema } = require('mongoose')

//Criaçao da estrutura de dados ("Tabela") que sera usada no banco 
const clienteSchema = new Schema({
    nomeCliente: {
        type: String
    },
    foneCliente: {
        type: String
    },
    emailCliente: {
        type: String
    }
})

//exportar para o main.js
module.exports = model('Clientes', clienteSchema)