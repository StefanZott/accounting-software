// wichtige Imports
const { Menu } = require('electron');

//Eigene Imports
let WindowManager = require('./windowManager');

// Globale BrowserWindow
global.categorieWindow = null;

function createMenu() {
    let mainMenu = Menu.buildFromTemplate([
        {
            label: 'Datei',
            submenu: [
            {label: 'Neu'},
            {label: 'Öffnen'},
            {label: 'Speichern'},
            {label: 'Speichern unter'},
            {label: 'Schliessen'}
        ]
        },
        {
            label: 'Bearbeiten'
        },
        {
            label: 'Ansicht'
        },
        {
            label: 'Eingaben',
            submenu: [
                {
                    label: 'Neue Kategorie anlegen',
                    click: () => {
                        w = new WindowManager('./src/html/categorie.html', 400 ,300);
                        w.createFramelessModalWindow();
                    }
                },
                {label: 'Neue Unterkategorie anlegen'}
            ]
        },
        {
            label: 'Hilfe'
        }
    ])

    return mainMenu;
}

module.exports={
    createMenu
}