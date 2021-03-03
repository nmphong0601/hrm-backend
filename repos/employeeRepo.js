var md5 = require('crypto-js/md5');
var db = require('../fn/postgresql-db'),
    opts = require('../fn/opts');

exports.loadAll = function() {
    var sql = 'select * from employees';
    return db.load(sql);
}

exports.loadPage = function(page) {
    var offset = (page - 1) * opts.GENERAL.EMPLOYEE_PER_PAGE;
    var sql = `select * from employees limit ${opts.GENERAL.EMPLOYEE_PER_PAGE + 1} offset ${offset}`;
    return db.load(sql);
}

exports.load = function(id) {
    var sql = `select * from employees where oid = ${id}`;
    return db.load(sql);
}

exports.loadByDepartment = function(depOID) {
	var sql = `select * from employees where department_oid = ${depOID}`;
	return db.load(sql);
}

exports.loadByDepartmentPage = function(depOID, page) {
    const limit = opts.GENERAL.EMPLOYEE_PER_PAGE + 1;
    const offset = (page - 1) * opts.GENERAL.EMPLOYEE_PER_PAGE;
    const sql = `select * from employees where department_oid = ${depOID} limit ${limit} offset ${offset}`;
    return db.load(sql);
}

exports.insertUser = function(user) {
    var md5_password = md5(user.password);
    var sql = `insert into users(user_name, password, permission) values('${user.user_name}', '${md5_password}', '${user.permission}')`;
    return db.insert(sql);
}

exports.insert = (emp) => {
    return new Promise((resolve, reject) => {
        var sql = `insert into employees(firt_name, last_name, full_name, birth_date, gender, avatar, phone, address, email, jobrole_oid, department_oid) `
                  +`values(${emp.firt_name}, ${emp.last_name}, '${emp.firt_name} ${emp.last_name}', ${emp.birth_date}, ${emp.gender}, ${emp.avatar}, ${emp.phone}, ${emp.address}, ${emp.email}, ${emp.jobrole_oid}, ${emp.department_oid})`;
        db.insert(sql)
            .then(id => {
                var promises = [];
                promises.push(this.insertUser(emp.user));//Insert User

                return Promise.all(promises);
            })
            .then(value => resolve(value))
            .catch(err => reject(err));
    });
}

exports.update = (id, emp) => {
    var sql = `update employees set first_name = '${emp.first_name}', last_name = '${emp.last_name}' , full_name = '${emp.first_name} ${emp.last_name}' , birth_date = '${emp.birth_date}' , gender = '${emp.gender}' , avatar = '${emp.avatar}' , phone = '${emp.phone}' , address = '${emp.address}' , email = '${emp.email}', jobrole_oid = '${emp.jobrole_oid}', department_oid = '${emp.department_oid}' where oid = ${id}`;
	return db.update(sql);
}

exports.delete = function (id) {
	var sql = `delete from employees where oid = ${id}`;
	return db.delete(sql);``
}