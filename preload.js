/**
 * Segurança e Desempenho
 */

const { contextBridge, ipcRenderer, ipcMain } = require('electron')

//Estabelecer a conexão com o banco de dados (envio de pedido para o main abrir a conexão com o banco de dados)
ipcRenderer.send('db-connect')

// Processos de comunicação entre renderer e main
contextBridge.exposeInMainWorld('api', {
    // A linha abaixo cria uma função que envia uma mensagem ao processo principal
    dbMensagem: (message) => ipcRenderer.on('db-message', message),
    fecharJanela: () => ipcRenderer.send('close-about'),
    janelaClientes: () => ipcRenderer.send('open-client'),
    janelaFornecedores: () => ipcRenderer.send('open-supplier'),
    janelaProdutos: () => ipcRenderer.send('open-product'),
    janelaRelatorios: () => ipcRenderer.send('open-report')
})