const electron = require('electron');
const {dialog} = require('electron').remote;
const $ = require('jquery');
const remote = electron.remote;

//Dummy User
let login = {
    username: 'Admin',
    password: 'admin'
}

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

    if (login.username === username) {
        if (login.password === password) {
            alert('Willkommen ' + username);
            mainWindow.show();
            loginWindow.close();
        } else {
            dialog.showErrorBox('ERROR' , 'Falsches Passwort!')
        }
    } else {
        dialog.showErrorBox('ERROR' , 'Falscher Benutzername!')
    }
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

/* 
// Alternative zu JQuery

const loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', () => {
        
})  */
