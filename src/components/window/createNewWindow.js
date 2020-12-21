const { BrowserWindow, Menu} = require('electron');
const path = require('path');

const {createMenu} = require('./menu')

function createWindow(art, path , modal , show ,frame,  parentwindow , height, width) {
  let window;  
  
  switch (art) {
        case 'menu':
          window = new BrowserWindow({
              width: width,
              height: height,
              // Gibt dem Window permanenten Focus
              modal: modal,
              show: show,
              // Damit wird die Titlebar ausgeblendet
              frame: frame,
              parent: parentwindow,
              webPreferences: {
                // Aktiviert die Fähigkeit Node.js für diesen BrowserWindow. Default: false
                nodeIntegration: true,
                // Erlaubt die Kommunikation zwischen dem renderer process und main process. Default: false
                enableRemoteModule: true
              }
            })
      
            // Wird die Standard Menüleiste von Electron ausgeblendet
            window.setMenu(null);
            window.webContents.openDevTools()
            window.loadFile(path);
            Menu.setApplicationMenu(createMenu());
            break;
    
        default:
            window = new BrowserWindow({
                width: width,
                height: height,
                // Gibt dem Window permanenten Focus
                modal: modal,
                show: show,
                // Damit wird die Titlebar ausgeblendet
                frame: frame,
                parent: parentwindow,
                webPreferences: {
                  // Aktiviert die Fähigkeit Node.js für diesen BrowserWindow. Default: false
                  nodeIntegration: true,
                  // Erlaubt die Kommunikation zwischen dem renderer process und main process. Default: false
                  enableRemoteModule: true
                }
            })
        
            // Wird die Standard Menüleiste von Electron ausgeblendet
            window.setMenu(null);
            window.webContents.openDevTools()
            window.loadFile(path);
            break;
    }

    return window;
}

module.exports={
    createWindow
}