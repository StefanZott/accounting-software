const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

module.exports = class windowManager {
    
    path;
    width;
    height;

    constructor(path, width , height) {
        this.path = path;
        this.width = width;
        this.height = height
    }
 
    createFramelessModalWindow() {
        let window = new BrowserWindow({
            width: this.width,
            height: this.height,
            // Gibt dem Window permanenten Focus
            modal: true,
            show: true,
            // Damit wird die Titlebar ausgeblendet
            frame: false,
            webPreferences: {
              // Aktiviert die Fähigkeit Node.js für diesen BrowserWindow. Default: false
              nodeIntegration: true,
              // Erlaubt die Kommunikation zwischen dem renderer process und main process. Default: false
              enableRemoteModule: true
            }
        })

        // Wird die Standard Menüleiste von Electron ausgeblendet
        window.setMenu(null);
        window.loadFile(this.path);
        //später entfernen
        window.webContents.openDevTools();
    }

}