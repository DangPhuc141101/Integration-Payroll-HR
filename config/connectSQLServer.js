const sql = require('mssql');
const config = {
    user: 'dangphuc',
    password: 'admin',
    server: 'localhost',
    database: 'HR',
    options: {
        trustServerCertificate: true,
        trustedConnection: true,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS'
    },
}

module.exports = config;