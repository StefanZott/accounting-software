const electron = require('electron');
const {dialog} = require('electron').remote;
const BrowserWindow = electron.remote.BrowserWindow;
const $ = require('jquery');
const remote = electron.remote;

//Datenbank Import
let {checkLogin,getConnection} = require('../database/db');

// die Funktion wird aufgerufen wenn der Button Login gedrückt wird.
// Die Funktion überprüft, ob der Eingaben von den Input Fields username und password
// übereinstimmen. 
// Bei einer Übereinstimmung: Wird ein Alert mit dem Benutzername ausgegeben und LoginWindow geschlossen und MainWindow show auf true 
$('#loginBtn').on('click', () => {
    let window = remote.BrowserWindow.getAllWindows();
    let loginWindow = window[0];
    let mainWindow = remote.getGlobal('mainWindow');
    let username = $('#username').val();
    let password = $('#password').val();

    // Check vergleicht die Daten von den Input Fields mit den Daten aus der Datenbank.
    // Wichtig:
    // Die Funktion Check muss asynchron sein, weil die Funktion auf die Daten von der Datenbank
    // warten muss. Daher muss mit Aysnc/await gearbeitet werden.
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
                
                    mainWindow.webContents.send('username' , username)
                    mainWindow.webContents.send('checkConnection' , connection)

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

$('#registrationBtn').on('click', () => {

    const registrationWindow = new BrowserWindow({
        width: 400,
        height: 600,
        // Gibt dem Window permanenten Focus
        modal: true,
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
      registrationWindow.setMenu(null);
      registrationWindow.webContents.openDevTools()
      registrationWindow.loadFile('./src/html/registration.html');
 
})