var md5 = require('crypto-js/md5');

var db = require('../fn/postgresql-db');

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

exports.changePassword = (user_name, new_password) => {
    var md5_password = md5(new_password);
    var sql = `update users set password = '${md5_password}' where user_name = ${user_name}`;
    return db.update(sql);  
}

exports.resetPassword = (user_name) => {
    var md5_password = md5('123456');
    var sql = `update users set password = '${md5_password}' where user_name = ${user_name}`;
    return db.update(sql);  
}

exports.login = function(user_name, password) {
    return new Promise((resolve, reject) => {
        var md5_password = md5(password);
        var sql = `select users.*, json_agg(employees) AS "employees" from users inner join employees on users.employee_oid = employees.oid where users.user_name = '${user_name}' and users.password = '${md5_password}' GROUP BY users.oid`;
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