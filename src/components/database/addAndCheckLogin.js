const config = require('../../database/db_config')
const connection = config.connection;

async function addAndCheckLogin(username, password) {
    let existUser = '';

    await new Promise((resolve,reject) => {
        connection.query("SELECT * FROM table_login WHERE username = '" + username + "'", (err , results, fields) => {
            if (results.length > 0) {
                dialog.showMessageBox({message: 'Benutzername schon vergeben', title: '', type: 'info'});
                resolve(true)
            } else {
                connection.query("INSERT INTO table_login (username , password) VALUES ('" + username + "','" + password + "')");
                resolve(false)
            }
        })
    }).then(result =>{
        existUser = result
    })
    
    return await existUser;
}

module.exports={
    addAndCheckLogin
}