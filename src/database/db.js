const electron = require('electron');
const remote = electron.remote;
const dialog = remote.dialog;
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'newgeneration',
    password: 'NewGeneration2020',
    database: 'accounting_soft',
    port: 3306
})

// Mit checkLogin werden die Daten von der Relation logindata abgerufen.
// Wichtig: 
// Da es sich wieder um eineasynchrone Funktion handelt, muss vor jedem Aufruf ein awiat stehen.
async function checkLogin() {
    let users;

    await new Promise((resolve,reject) => {
        connection.connect();
        connection.query('SELECT * FROM loginData', (error,results,fields) => {
            (error) ? dialog.showMessageBox({message: error.message, title: 'Datenbank', type: 'error'}) : null;
            resolve(results[0]);       
        })
        connection.end();
    }).then(user => {
        users = user
        }
    ).catch(error => {
        dialog.showMessageBox({message: error, title: 'Datenbank', type: 'error'})
    })

    return await users;
}

async function addUserInDB(user) {
    connection.connect();

    connection.query('SELECT * FROM loginData' , (err , results, fields) => {
        for (let index = 0; index < results.length; index++) {
            if (results[index]['username'] === user.username) {
                dialog.showMessageBox({message: 'Benutzername schon vergeben', title: '', type: 'info'})
            } else {
                dialog.showMessageBox({message: 'Sie wurden erfolgreich angelegt', title: '', type: 'info'})
            }
        }
    })

    connection.end();
}

module.exports={
    checkLogin,
    addUserInDB
}