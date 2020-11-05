const electron = require('electron');
const {dialog} = require('electron').remote;
const BrowserWindow = electron.remote.BrowserWindow;
const $ = require('jquery');
const remote = electron.remote;

//Datenbank Import
const database = require('../database/db');

// die Funktion wird aufgerufen wenn der Button Login gedrückt wird.
// Die Funktion überprüft, ob der Eingaben von den Input Fields username und password
// übereinstimmen. 
// Bei einer Übereinstimmung: Wird ein Alert mit dem Benutzername ausgegeben und LoginWindow geschlossen und MainWindow show auf true 
$('#loginBtn').on('click', () => {
    let window = remote.BrowserWindow.getAllWindows();
    let loginWindow = window[0];
    let mainWindow = window[1];
    let username = $('#username').val();
    let password = $('#password').val();

    // Check vergleicht die Daten von den Input Fields mit den Daten aus der Datenbank.
    // Wichtig:
    // Die Funktion Check muss asynchron sein, weil die Funktion auf die Daten von der Datenbank
    // warten muss. Daher muss mit Aysnc/await gearbeitet werden.
    async function check() {
        // Wichtig: Vor database.checkLogin() muss ein await stehen, weil die Daten benötigt werden
        let users = await database.checkLogin();
        if (username === users.username ) {
            if (password === users.password) {
                mainWindow.show();
                loginWindow.close();
            } else {
                dialog.showErrorBox('Login' , 'Das Passwort ist falsch');    
            }
        } else {
            dialog.showErrorBox('Login' , 'Der Benutzername ist falsch');
        }
    }

    check();
})

// die Funktion wird aufgerufen wenn der Button Cancel gedrückt wird.
// Die Funktion sorgt dafür, dass alle BrowserWindow die aktiv sind geschlossen werden
$('#cancelBtn').on('click', () => {
    let window = remote.BrowserWindow.getAllWindows();
    let loginWindow = window[0];
    let mainWindow = window[1];

    mainWindow.close();
    loginWindow.close();
})
