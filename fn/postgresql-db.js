const Pool = require('pg').Pool;
const { Client } = require('pg');
var opts = require('../fn/opts');

var createConnection = () => {
    // return new Pool({
    //     user: opts.POSTGRE_DB.USER,
    //     host: opts.POSTGRE_DB.HOST,
    //     database: opts.POSTGRE_DB.DB_NAME,
    //     password: opts.POSTGRE_DB.PWD,
    //     port: opts.POSTGRE_DB.PORT,
    //     ssl: true
    // });
    return new Client({
        connectionString: opts.POSTGRE_DB.CONNECTION_STRING,
        ssl: { rejectUnauthorized: false }
    })
}

exports.load = function(sql) {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, function(error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results.rows);
            }

            cn.end();
        });
    });
}

exports.insert = function(sql) {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, function(error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results.rowCount);
            }

            cn.end();
        });
    });
}

exports.update = function(sql) {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, function(error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results.rowCount);
            }

            cn.end();
        });
    });
}

exports.delete = function(sql) {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, function(error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results.rowCount);
            }

            cn.end();
        });
    });
}