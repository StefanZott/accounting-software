// wichtige Imports
const electron = require('electron');
const {dialog} = require('electron').remote;
const $ = require('jquery');
const remote = electron.remote;

//Datenbank Import
let {checkLogin,getConnection} = require('../database/db');

//Eigene Imports
let WindowManager = require('../components/window/windowManager');

// Globale BrowserWindow
let mainWindow = remote.getGlobal('mainWindow');
let loginWindow = remote.getGlobal('loginWindow');
global.registrationWindow = null;

// Allgemeine Variablen
let username;
let password;

/*  ________________________________________________________________________________
    |                                                                               |
    |                                   loginBtn                                    |
    |_______________________________________________________________________________|
*/

// die Funktion wird aufgerufen wenn der Button Login gedrückt wird.
// Die Funktion überprüft, ob der Eingaben von den Input Fields username und password
// übereinstimmen. 
// Bei einer Übereinstimmung: Wird ein Alert mit dem Benutzername ausgegeben und LoginWindow geschlossen und MainWindow show auf true 
$('#loginBtn').on('click', () => {
    username = $('#username').val();
    password = $('#password').val();
    // Check vergleicht die Daten von den Input Fields mit den Daten aus der Datenbank.
    // Wichtig:
    // Die Funktion Check muss asynchron sein, weil die Funktion auf die Daten von der Datenbank
    // warten muss. Daher muss mit Aysnc/await gearbeitet werden.
    check();
})

$('#loginBtn').keypress((event) => {
    username = $('#username').val();
    password = $('#password').val();
    
    if (event.key === 'Enter') {
        check();
    } 
})

/*  ________________________________________________________________________________
    |                                                                               |
    |                                   cancelBtn                                   |
    |_______________________________________________________________________________|
*/

// die Funktion wird aufgerufen wenn der Button Cancel gedrückt wird.
// Die Funktion sorgt dafür, dass alle BrowserWindow die aktiv sind geschlossen werden
$('#cancelBtn').on('click', () => {
    mainWindow.close();
    loginWindow.close();
})

$('#cancelBtn').keypress((event) => {
    if (event.key === 'Enter') {
        mainWindow.close();
        loginWindow.close();
    } 
})

/*  ________________________________________________________________________________
    |                                                                               |
    |                                   registrationBtn                             |
    |_______________________________________________________________________________|
*/

$('#registrationBtn').on('click', () => {
    w = new WindowManager('./src/html/registration.html', 400 ,600);
    w.createFramelessModalWindow();
})

async function check() {
    let foundUsername = false;
    let foundPassword = false;
    let connection = await getConnection();

    // Wichtig: Vor database.checkLogin() muss ein await stehen, weil die Daten benötigt werden
    let users = await checkLogin()

    for (let index = 0; index < users.length; index++) {
        if (username === users[index]['username'] ) {
            foundUsername = true;
            break;
        }
    }

    if (foundUsername) {
        for (let index = 0; index < users.length; index++) {
            if (password === users[index]['password']) {
                mainWindow.show();
                foundPassword = true;
            
                // Der Gegenpart ist in der main.js Zeile 30
                mainWindow.webContents.send('username' , username);
                // Der Gegenpart ist in der main.js Zeile 35
                mainWindow.webContents.send('checkConnection' , connection);

                loginWindow.close();

                break;
            }
        }

        if (!foundPassword) {
            dialog.showErrorBox('Login' , 'Das Passwort ist falsch'); 
        }
    } else {
        dialog.showErrorBox('Login' , 'Der Benutzername ist falsch');
    }
}