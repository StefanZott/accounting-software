const config = require('../../database/db_config')
const connection = config.connection;

async function getSubCategorieID(name) {
    let id;
    await new Promise ((resolve,reject) => {
         connection.query("SELECT ScID FROM table_sub_categorie WHERE name = '"+ name +"'", (error,results,fields) => {
             resolve(results[0])
         })
     }).then(ids => {
         id = ids
     })

     return await id.ScID;
}

module.exports={
    getSubCategorieID
}