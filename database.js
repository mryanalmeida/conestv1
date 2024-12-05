/**
 * modulo de conexão com o banco de dados
 * uso do mongoose
 */

//Imortar a biblioteca
const mongoose = require('mongoose')

//Definir a URL e autenticação do banco de dados
const url = 'mongodb+srv://Marcos:Mryan250903@cluster0.w5mls.mongodb.net/'

//Status de conexão ("icone de conexão")
let isConected = false

//Só estabelecer uma nova conexão se não estiver conectado
const dbConect = async () => {
    if (isConected === false) {
        await conectar()
    }
}

//conectar
const conectar = async () => {
    if (isConected === false)
        try {
            //linha abaixo abre a conexão com o MongoDB
            await mongoose.connect(url)
            isConected = true // sinalizar que o banco de dados está conectado
            console.log("MongoDB Conectado")
        } catch (error) {
            console.log(`Problema detectado: ${error}`)
        }
}

const desconectar = async () => {
    if (isConected === true)
        try {
            //linha abaixo encerra a conexão com o MongoDB
            await mongoose.disconnect(url)
            isConected = false // sinalizar que o banco de dados está desconectado
            console.log("MongoDB Desconectado")
        } catch (error) {
            console.log(`Problema detectado: ${erro}`)
        }
}
//Exportar para o main.js as funçoes desejadas
module.exports = { dbConect, desconectar }