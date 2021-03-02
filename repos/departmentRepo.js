var db = require('../fn/mysql-db'),
    opts = require('../fn/opts');

exports.loadAll = function() {
    var sql = 'select * from departments';
    return db.load(sql);
}

exports.loadPage = function(page) {
    var offset = (page - 1) * opts.GENERAL.DEP_PER_PAGE;
    var sql = `select * from departments limit ${opts.GENERAL.DEP_PER_PAGE + 1} offset ${offset}`;
    return db.load(sql);
}

exports.load = function(id) {
    var sql = `select * from departments where oid = ${id}`;
    return db.load(sql);
}

exports.insert = (dep) => {
    var sql = `insert into departments(name) values(${dep.name})`;
	return db.insert(sql);
}

exports.delete = function (id) {
	var sql = `delete from departments where oid = ${id}`;
	return db.delete(sql);
}