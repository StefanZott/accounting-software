const Sequelize = require('sequelize');

let config = {
    host: 'db4free.net',
    user: 'newgeneration',
    password: 'NewGeneration2020',
    database: 'accounting_soft',
    port: 3306
}

let sequelize = new Sequelize('mysql://' + config.user + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.database);

function getConnection() {
    sequelize.authenticate().then(() => {
        console.log('=================================================');
        console.log('database : ' + config.database + ' connected');
        console.log('=================================================');
    }).catch((err) => {
        console.log('=================================================');
        console.log('error connecting: ' + err);
        console.log('=================================================');
    })
}

module.exports={
    getConnection
}