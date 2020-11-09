const mysql = require('mysql');

/* const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'newgeneration',
    password: 'NewGeneration2020',
    database: 'accounting_soft',
    port: 3306
}) */

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'accounting_software',
    port: 3306
})

/* const connection = mysql.createConnection({
    host: 'fdb28.awardspace.net',
    user: '3645161_accounting',
    password: '#Kemmeten1985!',
    database: '3645161_accounting',
    port: 3306
}) */

/* const connection = mysql.createConnection({
    host: 'rdbms.strato.de',
    user: 'U4338140',
    password: '#Kemmeten1985!',
    database: 'DB4338140',
    port: 3306
}) */

   module.exports={
       connection
   }