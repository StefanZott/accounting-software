const config = require('../../database/db_config')
const connection = config.connection;

async function getCategorieID(name) {
    let id;
    await new Promise ((resolve,reject) => {
         connection.query("SELECT CID FROM table_categorie WHERE name = '"+ name +"'", (error,results,fields) => {
             resolve(results[0])
         })
     }).then(ids => {
         id = ids
     })

     return await id.CID;
}

module.exports={
    getCategorieID
}