const electron = require('electron');
const remote = electron.remote;
const mysql = require('mysql');

const config = require('./db_config')
const connection = config.connection;

let {addAndCheckLogin} = require('../components/database/addAndCheckLogin');
let {addAndCheckPlace} = require('../components/database/addAndCheckPlace');
let {addUserInformation} = require('../components/database/addUserInformation');

// Mit checkLogin werden die Daten von der Relation logindata abgerufen.
// Wichtig: 
// Da es sich wieder um eineasynchrone Funktion handelt, muss vor jedem Aufruf ein awiat stehen.
async function checkLogin() {
    let users;

    await new Promise((resolve,reject) => {
        connection.query('SELECT * FROM table_login', (error,results,fields) => {
            (error) ? dialog.showMessageBox({message: error.message, title: 'Datenbank', type: 'error'}) : null;
            resolve(results);       
        })
    }).then(user => {
        users = user
        }
    ).catch(error => {
        // dialog.showMessageBox({message: error, title: 'Datenbank', type: 'error'})
    })

    return await users;
}

// Überprüfe die Daten vom User, ob sie in der Datenbank vorhanden sind
async function addUserInDB(user) {
    let existUser = await addAndCheckLogin(user.username, user.password);
   
    if (existUser) {

    } else {
        await addAndCheckPlace(user.postcode, user.place);
        await addUserInformation(user);
        dialog.showMessageBox({message: 'Du wurdest erfolgreich angelegt', title: '', type: 'info'});
    }
}

module.exports={
    checkLogin,
    addUserInDB
}