const { shell, ipcMain } = require('electron')
const { app, BrowserWindow, Menu } = require('electron');
const path = require('node:path')

//Janela Principal
function createWindow() {
    win = new BrowserWindow({
        width: 1010,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    //Menu Personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')

    //botoes
    ipcMain.on('open-client', () => {

    })
}


//Janela sobre
function aboutWindow() {
    const about = new BrowserWindow({
        width: 460,
        height: 220,
        autoHideMenuBar: true,
        resizable: false,
        minimizable: false,
    })
    about.loadFile('./src/views/sobre.html')
}

//Execução assincrona do aplicativo electron
app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

//Template do menu
const template = [
    {
        label: 'Arquivo',
        submenu: [
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
                label: 'Aplicar Zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o zoom padrao',
                role: 'resetZoom'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Repositório',
                click: () => shell.openExternal('https://github.com/mryanalmeida/conestv1')
            },
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    }
]