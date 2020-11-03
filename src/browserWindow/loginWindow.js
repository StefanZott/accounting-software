const { win , BrowserWindow, app , screen} = require('electron');
const path = require('path')


function loginWindow() {
    const loginWindow = new BrowserWindow({
        width: 800,
        height: 600,
        modal: true,
        backgroundColor: "white",
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
      })
      loginWindow.setMenu(null);
      loginWindow.loadFile('./src/html/login.html');
      loginWindow.webContents.openDevTools()
      return loginWindow;
}
