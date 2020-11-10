const config = require('../../database/db_config')
const connection = config.connection;

async function getID(username) {
    let id;
    await new Promise ((resolve,reject) => {
         connection.query("SELECT loginID FROM table_login WHERE username = '"+ username +"'", (error,results,fields) => {
             resolve(results[0])
         })
     }).then(ids => {
         id = ids
     })

     return await id.loginID;
}

module.exports={
    getID
}