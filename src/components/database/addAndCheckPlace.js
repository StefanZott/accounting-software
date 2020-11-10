const electron = require('electron');
const remote = electron.remote;
const mysql = require('mysql');

const config = require('../../database/db_config')
const connection = config.connection;

async function addAndCheckPlace(postcode,place) {
    await connection.query("SELECT * FROM table_place WHERE place = '" + place + "'", (err, results, fields) => {
        if (results.length === 0) {
            connection.query("INSERT INTO table_place (postcode , place) VALUES (" + postcode + ",'" + place + "')");
        } else {

        }
    })
}

module.exports={
    addAndCheckPlace
}