// eigene Imports
const config = require('./db_config')
let {addAndCheckLogin} = require('../components/database/addAndCheckLogin');
let {addAndCheckPlace} = require('../components/database/addAndCheckPlace');
let {addUserInformation} = require('../components/database/addUserInformation');
let {getCategorieID} = require('../components/database/getCategorieID');
let {getSubCategorieID} = require('../components/database/getSubCategorieID');

// Allgemeine Variablen
const connection = config.connection;

// Überprüft die Connection zu der Datenbank und gibt ein true oder false zurück
async function getConnection() {
    let connected;

    await new Promise((resolve,reject) => {
        connection.connect((error) => {
            if (error) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    }).then(result => {
        connected = result
    })

    return await connected;
}

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
        dialog.showMessageBox({message: error, title: 'Datenbank', type: 'error'})
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

// Überprüft ob die Kategorie schon angelegt ist, wenn nicht wird sie der Datenbank
// hinzugefügt.
async function addCategorieInDatabase(categorie) {
    let result;

    await new Promise((resolve,reject) => {
        connection.query("SELECT * FROM table_categorie WHERE name = '" + categorie + "'", (err,results,fields) => {
            console.log(results.length)
            if(results.length <= 0) {
                connection.query("INSERT INTO table_categorie(name) VALUES ('" + categorie + "')");
                resolve(true)
            } else {
                resolve(false)
            } 
        }); 
    }).then(results => {
        result = results;
    })

    return await result;
}

async function getAllCategorie() {
    let array;

    await new Promise((resolve,reject) => {
        connection.query("SELECT * FROM table_categorie", (err,results,fields) => {
            resolve(results);
        })
    }).then(result => {
        array = result; 
    })

    return await array;
}

async function createRecordAndAddInDatabase(categorieName , subCategorieName) {
    let idFromCategorie = await getCategorieID(categorieName);

    await connection.query("INSERT INTO table_sub_categorie(name) VALUES ('" + subCategorieName + "')");

    let idFromSubCategorie = await getSubCategorieID(subCategorieName);

    if (categorieName.length > 0 && subCategorieName.length > 0) {
            await connection.query("INSERT INTO table_help_categorie(CID,ScID) VALUES ("+ idFromCategorie + " , " + idFromSubCategorie + ")");
            return true;
    }

    return false;
}

module.exports={
    getConnection,
    checkLogin,
    addUserInDB,
    addCategorieInDatabase,
    getAllCategorie,
    createRecordAndAddInDatabase
}