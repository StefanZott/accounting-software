// wichtige Imports
const electron = require('electron');
const remote = electron.remote;
const dialog = remote.dialog;
const $ = require('jquery');

// eigene Imports
let {addCategorieInDatabase} = require('../database/db');

// Allgemeine Variablen
let categorieName;

/*  ________________________________________________________________________________
    |                                                                               |
    |                                   addCategorieBtn                             |
    |_______________________________________________________________________________|
*/
$('#addCategorieBtn').on('click', () => {
    addInTableCategorie();
});

/*  ________________________________________________________________________________
    |                                                                               |
    |                                   cancelBtn                                   |
    |_______________________________________________________________________________|
*/
$('#cancelBtn').on('click', () => {
    remote.getCurrentWindow().close();
})


async function addInTableCategorie() {
    categorieName = $('#categorieName').val();
    
    let result = await addCategorieInDatabase(categorieName)
    
    if (result) {
        remote.getCurrentWindow().close();
    } else {
        dialog.showMessageBox({message:"Versuchen Sie es nochmal",title:'',type: 'info'})
    }
}