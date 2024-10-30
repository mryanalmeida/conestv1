const { app, BrowserWindow } = require('electron');

//janela pricipal
function createWindow() {
    nativeTheme.themeSource = 'dark'
    const win = new BrowserWindow({
        width: 1010,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('./src/views/index.html');
}

//Janela sobre
function aboutWindow() {
    nativeTheme.themeSource = 'dark'
    const about = new BrowserWindow({
        width: 360,
        height: 220,
        autoHideMenuBar: true, //esonder o menu
        resizable: false,
        minimizable: false,
        //titleBarStyle: 'hidden' //para totem de auto atendimento
    })
    about.loadFile('./src/views/sobre.html')
}