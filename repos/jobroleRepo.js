var db = require('../fn/mysql-db'),
    opts = require('../fn/opts');

exports.loadAll = function() {
    var sql = 'select * from jobroles';
    return db.load(sql);
}

exports.loadPage = function(page) {
    var offset = (page - 1) * opts.GENERAL.JOB_PER_PAGE;
    var sql = `select * from jobroles limit ${opts.GENERAL.JOB_PER_PAGE + 1} offset ${offset}`;
    return db.load(sql);
}

exports.load = function(id) {
    var sql = `select * from jobroles where oid = ${id}`;
    return db.load(sql);
}

exports.loadByEmployee = function(employee_oid) {
    var sql = `select * from jobroles where employee_oid = ${employee_oid}`;
    return db.load(sql);
}

exports.insert = (job) => {
    var sql = `insert into jobroles(name) values(${job.Name})`;
	return db.insert(sql);
}

exports.update = (id, job) => {
    var sql = `update jobroles set name = '${job.name}' where oid = ${id}`;
	return db.update(sql);
}

exports.delete = function (id) {
	var sql = `delete from jobroles where oid = ${id}`;
	return db.delete(sql);
}