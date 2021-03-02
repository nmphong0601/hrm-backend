var md5 = require('crypto-js/md5');

var db = require('../fn/mysql-db');

exports.add = function(poco) {
    // poco = {
    //     Username: 1,
    //     Password: 'new name',
    //     Name: 'name',
    //     Email: 'email',
    //     DOB: '2000-09-01',
    //     Permission: 0
    // }

    var md5_password = md5(poco.password);
    var sql = `insert into users(user_name, password, permission) values('${poco.user_name}', '${md5_password}', '${poco.permission}')`;
    return db.insert(sql);
}

exports.login = function(userName, password) {
    return new Promise((resolve, reject) => {
        var md5_password = md5(password);
        var sql = `select * from users where user_name = '${userName}' and password = '${md5_password}'`;
        db.load(sql)
            .then(rows => {
                if (rows.length === 0) {
                    resolve(null);
                } else {
                    var user = rows[0];
                    resolve(user);
                }
            })
            .catch(err => reject(err));
    });
}

exports.load = function(id) {
    var sql = `select * from users where oid = ${id}`;
    return db.load(sql);
}