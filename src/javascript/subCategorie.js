// wichtige Imports
const electron = require('electron');
const remote = electron.remote;
const dialog = remote.dialog;
const $ = require('jquery');

// eigene Imports
let {getAllCategorie,createRecordAndAddInDatabase} = require('../database/db');

// Allgemeine Variablen
let categorieName;
let subCategorieName;

// Beim laden der Datei ausgeführte funktionen
getAllCategorieFromDatabse();

/*  ________________________________________________________________________________
    |                                                                               |
    |                                   addSubCategorieBtn                          |
    |_______________________________________________________________________________|
*/
$('#addSubCategorieBtn').on('click', () => {
    categorieName = document.getElementById("chooseCategorie").value;
    subCategorieName = document.getElementById("subCategorieName").value;
    
    createRecord();
});

/*  ________________________________________________________________________________
    |                                                                               |
    |                                   cancelBtn                                   |
    |_______________________________________________________________________________|
*/
$('#cancelBtn').on('click', () => {
    remote.getCurrentWindow().close();
})

async function getAllCategorieFromDatabse() {
    let array = await getAllCategorie();
    let select =  document.getElementById("chooseCategorie");
    
    for (let index = 0; index < array.length; index++) {
        let value = array[index].name;
        let option =  document.createElement('option');
        option.textContent = value;
        option.value = value;
        select.appendChild(option);
    }
}

async function createRecord() {
    let result = await createRecordAndAddInDatabase(categorieName,subCategorieName);
    
    if (result) {
        remote.getCurrentWindow().close();
    } else {
        dialog.showMessageBox({message:"Konnte nicht angelegt werden!",title:'',type: 'info'})
    }
}