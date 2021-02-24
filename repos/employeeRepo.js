var db = require('../fn/mysql-db'),
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
    var sql = `select * from employees where OID = ${id}`;
    return db.load(sql);
}

exports.loadByDepartment = function(depOID) {
	var sql = `select * from employees where DepartmentOID = ${depOID}`;
	return db.load(sql);
}

exports.loadByDepartmentPage = function(depOID, page) {
    const limit = opts.GENERAL.EMPLOYEE_PER_PAGE + 1;
    const offset = (page - 1) * opts.GENERAL.EMPLOYEE_PER_PAGE;
    const sql = `select * from employees where DepartmentOID = ${depOID} limit ${limit} offset ${offset}`;
    return db.load(sql);
}

exports.insert = (emp) => {
    return new Promise((resolve, reject) => {
        var sql = `insert into employees(FirtName, LastName, FullName, JobRoleOID, DepOID) values(${emp.FirtName}, ${emp.LastName}, ${emp.FirtName} + ${emp.LastName}, ${emp.JobRoleOID}, ${emp.DepOID})`;
        db.insert(sql)
            .then(id => {
                var promises = [];
                promises.push();//Insert User

                return Promise.all(promises);
            })
            .then(value => resolve(value))
            .catch(err => reject(err));
    });
}

exports.delete = function (id) {
	var sql = `delete from employees where OID = ${id}`;
	return db.delete(sql);
}