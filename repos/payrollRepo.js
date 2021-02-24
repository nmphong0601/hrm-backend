var db = require('../fn/mysql-db');
opts = require('../fn/opts');

exports.loadAll = function() {
    var sql = 'select * from payrolls';
    return db.load(sql);
}

exports.loadPage = function(page) {
    var offset = (page - 1) * opts.GENERAL.PAY_PER_PAGE;
    var sql = `select * from payrolls limit ${opts.GENERAL.PAY_PER_PAGE + 1} offset ${offset}`;
    return db.load(sql);
}

exports.load = function(id) {
    var sql = `select * from payrolls where OID = ${id}`;
    return db.load(sql);
}

exports.loadByDepartment = function(depOID) {
	var sql = `select * from payrolls where DepartmentOID = ${depOID}`;
	return db.load(sql);
}

exports.loadByDepartmentPage = function(depOID, page) {
    const limit = opts.GENERAL.PAY_PER_PAGE + 1;
    const offset = (page - 1) * opts.GENERAL.PAY_PER_PAGE;
    const sql = `select * from payrolls where DepartmentOID = ${depOID} limit ${limit} offset ${offset}`;
    return db.load(sql);
}

exports.insert = (pay) => {
    // return new Promise((resolve, reject) => {
    //     var sql = `insert into payrolls(Salary, EmpOID) values(${pay.Salary, pay.EmpOID})`;
    //     db.insert(sql).then(value => resolve(value)).catch(err => reject(err));
    // });

    var sql = `insert into payrolls(Salary, EmpOID) values(${pay.Salary, pay.EmpOID})`;
	return db.insert(sql);
}

exports.delete = function (id) {
	var sql = `delete from payrolls where OID = ${id}`;
	return db.delete(sql);
}