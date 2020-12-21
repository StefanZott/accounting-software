// wichtige Imports
const { BrowserWindow, app, screen, Menu} = require('electron');

// Globale Window
global.mainWindow = null
global.loginWindow = null;

// eigene Imports
const {createMenu} = require('./src/components/window/menu')

function createWindows() {
  mainWindow = new BrowserWindow({
    width: screen.getPrimaryDisplay().size.width,
    height: screen.getPrimaryDisplay().size.height,
    show: false,
    webPreferences: {
      // Aktiviert die Fähigkeit Node.js für diesen BrowserWindow. Default: false
      nodeIntegration: true,
      // Erlaubt die Kommunikation zwischen dem renderer process und main process. Default: false
      enableRemoteModule: true
    }
  })
  // Wird die Standard Menüleiste von Electron ausgeblendet
  mainWindow.setMenu(null);
  mainWindow.loadFile('./src/html/main.html');
  Menu.setApplicationMenu(createMenu());

  loginWindow = new BrowserWindow({
    width: 400,
    height: 400,
    // Gibt dem Window permanenten Focus
    modal: true,
    show: true,
    resizable: true,
    // Damit wird die Titlebar ausgeblendet
    frame: false,
    parent: mainWindow,
    transparent: true,
    webPreferences: {
      // Aktiviert die Fähigkeit Node.js für diesen BrowserWindow. Default: false
      nodeIntegration: true,
      // Erlaubt die Kommunikation zwischen dem renderer process und main process. Default: false
      enableRemoteModule: true
    }
  })

  // Wird die Standard Menüleiste von Electron ausgeblendet
  loginWindow.setMenu(null);
  loginWindow.loadFile('./src/html/login.html');
}

app.whenReady()
.then(createWindows)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindows()
  }
})