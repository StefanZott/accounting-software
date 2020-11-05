const { dialog } = require('electron');
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
            if(error) throw error;
                resolve(results[0]);
            })
        connection.end();
    }).then(user => {
        users = user
        }
    ).catch(error => {
        dialog.showErrorBox('Datenbank' , error)
    })

    return await users;
}

module.exports={
    checkLogin
}