const config = require('../../database/db_config')
const connection = config.connection;

async function addNewCategorie(categorie) {
    let result;

    await new Promise((resolve,reject) => {
        try {
            connection.query("INSERT INTO table_categorie(name) VALUES ('" + categorie + "')");
        } catch (error) {
            resolve(false)
        }
    
        resolve(true)
    }).then(results => {
        result = results;
    })

    return await result;
}

module.exports={
    addNewCategorie
}