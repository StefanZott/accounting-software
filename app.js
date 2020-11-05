const { win, BrowserWindow, app, screen } = require('electron');
const path = require('path');
const { electron } = require('process');


function createWindows() {
  const mainWindow = new BrowserWindow({
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

  const loginWindow = new BrowserWindow({
    width: 400,
    height: 300,
    // Gibt dem Window permanenten Focus
    modal: true,
    show: true,
    // Damit wird die Titlebar ausgeblendet
    frame: false,
    parent: mainWindow,
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

app.whenReady().then(createWindows)

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