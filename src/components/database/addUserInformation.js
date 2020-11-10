const electron = require('electron');
const remote = electron.remote;
const mysql = require('mysql');

let {getID} = require('./getID');
let {getPostcode} = require('./getPostcode');
const config = require('../../database/db_config')
const connection = config.connection;

async function addUserInformation(user) {
    let loginID = await getID(user.username , user.password);
    let place = await getPostcode(user.place);

    await connection.query("INSERT INTO table_user (userID , loginID, firstname, lastname, street, email, phonenumber, postcode) VALUES (null , " + loginID + " , '" + user.firstname + "' , '" + user.lastname + "' , '" + user.street + "' , '" + user.email + "' , " + user.phonenumber + " , '" + place +"')", (error,results, fields) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Table loginData wird Datensatz hinzugefügt')
        }
    })
}

module.exports={
    addUserInformation
}