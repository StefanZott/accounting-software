// wichtige Imports
const { Menu } = require('electron');

//Eigene Imports
let WindowManager = require('./windowManager');

// Globale BrowserWindow
global.categorieWindow = null;
global.subCategorieWindow = null;

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
                        categorieWindow = new WindowManager('./src/html/categorie.html', 400 ,300);
                        categorieWindow.createFramelessModalWindow();
                    }
                },
                {
                    label: 'Neue Unterkategorie anlegen',
                    click: () => {
                        subCategorieWindow = new WindowManager('./src/html/subCategorie.html', 400, 300);
                        subCategorieWindow.createFramelessModalWindow();
                    }
                }
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