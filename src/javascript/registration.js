const electron = require('electron');
const remote = electron.remote;
const dialog = remote.dialog;
const $ = require('jquery');

let {addUserInDB} = require('../database/db');

let checkInput;


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
            checkInput = true;
        } else {
            checkInput = false;
            break;
        }
    }
    
    //Anzeige der Messagebox
    if (checkInput) {
        addUserInDB(registrationData);
        remote.getCurrentWindow().close()
    } else {
        dialog.showMessageBox({message: 'fehlende Eingabe', title: 'Info', type: 'info'})
    }

    

});

//schliesst Registrationsfenster und kehrt zum Login zurück
$('#returnLoginBtn').on('click', () => {
    remote.getCurrentWindow().close();
})