// Importação de pacotes (bibliotecas)
// nativeTheme (forçar um tema no sistema operacional)
// Menu (criar um menu personalizado)
// shell (acessar links externos)
const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain } = require('electron/main')
const path = require('node:path')

//Importação do modulo de conexão
const { dbConect, desconectar } = require('./db.js')
//Status de conexão com o banco de dados. No MongoDB é mais eficiente manter uma unica conexão aberta durante todo tempo de vida do aplicativo e usa-la quando nescessário. Fechar e reabrir constantemente a conexão aumenta a sobrecarga e reduz o desempenho do servidor.
//A variavel abaixo e usada para garantir que o banco de dados inicie desconectado(evitar abrir outra instância)
let dbcon = null


// Janela Principal
let win
function createWindow() {
    nativeTheme.themeSource = 'light'
    win = new BrowserWindow({
        width: 1010,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // Menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')

    // botões 
    ipcMain.on('open-client', () => {
        clientWindow()
    })

    ipcMain.on('open-supplier', () => {
        supplierWindow()
    })

    ipcMain.on('open-product', () => {
        productWindow()
    })

    ipcMain.on('open-report', () => {
        reportWindow()
    })
}

// Janela Sobre
function aboutWindow() {
    nativeTheme.themeSource = "light"
    // A linha abaixo obtem a janela principal
    const main = BrowserWindow.getFocusedWindow()
    let about
    // Validar a janela pai
    if (main) {
        about = new BrowserWindow({
            width: 320,
            height: 160,
            autoHideMenuBar: true, // Esconder o menu
            resizable: false, // Impedir redimensionamento
            minimizable: false, // Impedir minimizar a janela
            //titleBarStyle: "hidden" // Esconder a barra de estilo (ex: totem de auto atendimento)
            parent: main, // Estabelecer uma hierarquia de janelas
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }

    about.loadFile('./src/views/sobre.html')

    // Fechar a janela quando receber mensagem do processo de renderização.
    ipcMain.on('close-about', () => {
        // console.log("recebi a mensagem de fechar")
        // Validar se a janela foi destruida
        if (about && !about.isDestroyed()) {
            about.close()
        }
    })

}


// Janela Clientes
function clientWindow() {
    nativeTheme.themeSource = "light"
    // A linha abaixo obtem a janela principal
    const main = BrowserWindow.getFocusedWindow()
    let client
    // Validar a janela pai
    if (main) {
        client = new BrowserWindow({
            width: 800,
            height: 600,
            autoHideMenuBar: true, // Esconder o menu
            parent: main, // Estabelecer uma hierarquia de janelas
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }

    client.loadFile('./src/views/clientes.html')

}

// Janela Fornecedores
function supplierWindow() {
    nativeTheme.themeSource = "light"
    // A linha abaixo obtem a janela principal
    const main = BrowserWindow.getFocusedWindow()
    let supplier
    // Validar a janela pai
    if (main) {
        supplier = new BrowserWindow({
            width: 800,
            height: 600,
            autoHideMenuBar: true, // Esconder o menu
            parent: main, // Estabelecer uma hierarquia de janelas
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }

    supplier.loadFile('./src/views/fornecedores.html')

}

// Janela Produtos
function productWindow() {
    nativeTheme.themeSource = "light"
    // A linha abaixo obtem a janela principal
    const main = BrowserWindow.getFocusedWindow()
    let product
    // Validar a janela pai
    if (main) {
        product = new BrowserWindow({
            width: 800,
            height: 600,
            autoHideMenuBar: true, // Esconder o menu
            parent: main, // Estabelecer uma hierarquia de janelas
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }

    product.loadFile('./src/views/produtos.html')

}

// Janela Relatórios
function reportWindow() {
    nativeTheme.themeSource = "light"
    // A linha abaixo obtem a janela principal
    const main = BrowserWindow.getFocusedWindow()
    let report
    // Validar a janela pai
    if (main) {
        report = new BrowserWindow({
            width: 800,
            height: 600,
            autoHideMenuBar: true, // Esconder o menu
            parent: main, // Estabelecer uma hierarquia de janelas
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }

    report.loadFile('./src/views/relatorios.html')

}


// Execução assíncrona do aplicativo electron
app.whenReady().then(() => {
    createWindow()

    ///Mlehor lugar para estabelecer a conecxão com o banco de dados
    //importar antes o modulo de conexão no  inicio do codigo
    //conexão com o banco de dados0
    ipcMain.on('db-connect', async (event, message) => {
        //a linha abaixo estabelece a conexão com banco de dados 
        dbcon = await dbConect()
        //enviar ao renderizador uma mensagem para trocar o icone do status banco de dados
        event.reply('db-message', "conectado")
    })

    //desconectar do banco de dados, ao encerrar a aplicação
    app.on('before-quit', async () => {
        await desconectar(dbcon)
    })


    // Comportamento do MAC ao fechar uma janela
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// Encerrar a aplicação quando a janela for fechada (windows e linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Template do menu
const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Novo',
                accelerator: 'CmdOrCtrl+N'
            },

            {
                label: 'Abrir',
                accelerator: 'CmdOrCtrl+O'
            },
            {
                label: 'Salvar',
                accelerator: 'CmdOrCtrl+S'
            },
            {
                label: 'Salvar Como',
                accelerator: 'CmdOrCtrl+Shift+S'
            },

            {
                type: 'separator'
            },
            {
                label: 'Sair',
                accelerator: 'Alt+F4',
                click: () => app.quit()
            }

        ]
    },

    {
        label: 'Zoom',
        submenu: [
            {
                label: 'Aplicar zoom',
                role: 'zoomIn'
            },

            {
                label: 'Reduzir',
                role: 'zoomOut'
            },

            {
                label: 'Restaurar o zoom padrão',
                role: 'resetZoom'
            },
        ]
    },

    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Repositório',
                click: () => shell.openExternal('https://github.com/andrewdantas/conestv3')
            },

            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    }
]