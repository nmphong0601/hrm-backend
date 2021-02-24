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
    var sql = `select * from jobroles where OID = ${id}`;
    return db.load(sql);
}

exports.insert = (job) => {
    var sql = `insert into jobroles(Name) values(${job.Name})`;
	return db.insert(sql);
}

exports.delete = function (id) {
	var sql = `delete from jobroles where OID = ${id}`;
	return db.delete(sql);
}