const electron = require('electron');
const remote = electron.remote;
const mysql = require('mysql');

const config = require('./db_config')
const connection = config.connection;

async function checkConnection() {
    connection.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected');
        }
    })
}

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
        // dialog.showMessageBox({message: error, title: 'Datenbank', type: 'error'})
    })

    return await users;
}

// Überprüfe die Daten vom User, ob sie in der Datenbank vorhanden sind
async function addUserInDB(user) {
    let postcode;

    /* connection.query("SELECT * FROM place WHERE place = '" + user.place + "'", (err, results, fields) => {
        console.log('results')
        console.log(results)
        console.log('results.length')
        console.log(results.length)

        if (results.length > 0) {
            
        }

    }) */

    // Liest die Daten aus der Relation loginData aus und überprüft sie mit den Daten vom User
    connection.query("SELECT * FROM loginData WHERE username = '" + user.username + "'", (err , results, fields) => {
        if (results.length > 0) {
            // dialog.showMessageBox({message: 'Benutzername schon vergeben', title: '', type: 'info'});
        } else {
            console.log('Table loginData wird Datensatz hinzugefügt')
            connection.query("INSERT INTO loginData (username , password) VALUES ('" + user.username + "','" + user.password + "')");

            // Überprüft ob der Tupel vorhanden ist, wenn nicht wird er der Datenbank hinzugefügt
            connection.query("SELECT * FROM place WHERE place = '" + user.place + "'", (err, results, fields) => {
                if (results.length === 0) {
                    console.log('Table place wird Datensatz hinzugefügt')
                    connection.query("INSERT INTO place (postcode , place) VALUES (" + user.postcode + ",'" + user.place + "')");
                    postcode = user.postcode;
                    console.log(postcode)
                } else {
                    console.log(postcode)
                    postcode = user.postcode
                }

                if (err) {
                    console.log(err)
                }
            })

            // Persönlich information von dem User werden angelegt
            connection.query("INSERT INTO user (loginID, firstname, lastname, street, email, phonenumber, postcode)" +
                            " VALUES " +
                            "((SELECT loginID FROM loginData WHERE username = '" + user.username + "'),'" + user.firstname + "' ,'" + user.lastname + "','" + user.street + "' ,'" + user.email + "' , " + user.phonenumber + " , '" + user.postcode + "')", (error,results, fields) => {
                
                if (error) {
                    console.log(error)
                } else {
                    console.log('Table loginData wird Datensatz hinzugefügt')
                }
            })

            // dialog.showMessageBox({message: 'Du wurdest erfolgreich angelegt!', title: '', type: 'info'});
        }
    })
}

module.exports={
    checkConnection,
    checkLogin,
    addUserInDB
}