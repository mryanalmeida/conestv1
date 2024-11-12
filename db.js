/**
 * modulo de conexão com o banco de dados
 * uso do mongoose
 */

//Imortar a biblioteca
const mongoose = require('mongoose')

//Definir a URL e autenticação do banco de dados
const URL = 'mongodb+srv://admin:123senac@clusterconest.zebl9.mongodb.net/'

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
            console.log(`Problema detectado: ${erro}`)
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