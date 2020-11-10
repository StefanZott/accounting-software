const config = require('../../database/db_config')
const connection = config.connection;

async function getPostcode(place) {
    let result;
    await new Promise ((resolve,reject) => {
         connection.query("SELECT postcode FROM table_place WHERE place = '"+ place +"'", (error,results,fields) => {
             resolve(results[0])
         })
     }).then(places => {
        result = places
     })

     return await result.postcode;
}

module.exports={
    getPostcode
}