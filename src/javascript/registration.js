const electron = require('electron');
const {dialog} = require('electron').remote;
const $ = require('jquery');
const remote = electron.remote;

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
        dialog.showMessageBox({message : 'Daten wurden übertragen'});
    } else {
        dialog.showErrorBox('Error', 'fehlende Eingabe');
    }

});

//schliesst Registrationsfenster und kehrt zum Login zurück
$('#returnLoginBtn').on('click', () => {
    let window = remote.getCurrentWindow();
    window.close();
})