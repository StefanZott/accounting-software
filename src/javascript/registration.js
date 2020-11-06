const electron = require('electron');
const remote = electron.remote;
const dialog = remote.dialog;
const $ = require('jquery');

const database = require('../database/db');

let messageDialog;


// Registrationsdaten werden übergeben
$('#registrationBtn').on('click', () => {
    let registrationData = {
        firstname : $('#firstname').val(),
        lastname : $('#lastname').val(),
        street : $('#street').val(),
        postcode : $('#postcode').val(),
        place : $('#place').val(),
        phonenumber : $('#phonenumber').val(),
        email : $('#email').val(),
        username : $('#username').val(),
        password : $('#password').val()

    };

    //prüft ob Registrierungsdaten vollständig sind
    for (key in registrationData) {
        if (registrationData[key] !== "") {
            messageDialog = true;
        } else {
            messageDialog = false;
            break;
        }
    }
    
    //Anzeige der Messagebox
    if (messageDialog) {
        dialog.showMessageBox({message: 'Daten wurden übertragen', title: 'Info', type: 'info'})
    } else {
        dialog.showMessageBox({message: 'fehlende Eingabe', title: 'Info', type: 'info'})
    }

    database.addUserInDB(registrationData);

});

//schliesst Registrationsfenster und kehrt zum Login zurück
$('#returnLoginBtn').on('click', () => {
    let window = remote.getCurrentWindow();
    window.close();
})