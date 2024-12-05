const { contextBridge, ipcRenderer } = require('electron')

// Estabelecer a conexão com o banco (envio de pedido para o main abrir a conexão com o banco de dados)
ipcRenderer.send('db-connect')

contextBridge.exposeInMainWorld('api', {
    status: (message) => ipcRenderer.on('db-message', message),
    fecharJanela: () => ipcRenderer.send('close-about'),
    janelaClientes: () => ipcRenderer.send('open-client'),
    janelaFornecedores: () => ipcRenderer.send('open-supplier'),
    janelaProdutos: () => ipcRenderer.send('open-product'),
    janelaRelatorios: () => ipcRenderer.send('open-report'),
    resetarFormulario: (args) => ipcRenderer.on('reset-form', args),
    novoCliente: (cliente) => ipcRenderer.send('new-client', cliente),
    buscarCliente: (cliNome) => ipcRenderer.send('search-client', cliNome),
    novoFornecedor: (fornecedor) => ipcRenderer.send('new-supplier', fornecedor),
    novoProduto: (produto) => ipcRenderer.send('new-product', produto),
    renderizarCliente: (dadosCliente) => ipcRenderer.on('client-data', dadosCliente)
})