var express = require('express');
var constants = require('../fn/opts').GENERAL;
var departmentRepo = require('../repos/departmentRepo'), 
    authRepo = require('../repos/authRepo');

var router = express.Router();

router.get('', authRepo.verifyAccessToken, (req, res) => {
    departmentRepo.loadAll().then(rows => {
        res.json(rows);
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    });

    // var page = 1;
    // if (req.query.page) {
    //     page = +req.query.page;
    // }

    // departmentRepo.loadPage(page).then(rows => {
    //     var hasMore = rows.length > constants.DEP_PER_PAGE;
    //     if (hasMore) {
    //         rows.pop();
    //     }

    //     var data = {
    //         departments: rows,
    //         hasMore: hasMore
    //     }
    //     res.json(data);
    // }).catch(err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('View error log on console.');
    // });
});

router.get('/page', authRepo.verifyAccessToken, (req, res) => {//req.query => from url
    var page = 1;
    if (req.query.page) {
        page = +req.query.page;
    }

    departmentRepo.loadPage(page).then(rows => {
        var hasMore = rows.length > constants.DEP_PER_PAGE;
        if (hasMore) {
            rows.pop();
        }

        var data = {
            departments: rows,
            hasMore: hasMore
        }
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    });
});

router.get('/:id', authRepo.verifyAccessToken, (req, res) => {
    if (req.params.id) {
        var id = req.params.id;

        if (isNaN(id)) {
            res.statusCode = 400;
            res.end();
            return;
        }

        departmentRepo.load(id).then(rows => {
            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.statusCode = 204;
                res.end();
            }
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
    } else {
        res.statusCode = 400;
        res.json({
            msg: 'error'
        });
    }
});

router.post('', authRepo.verifyAccessToken, (req, res) => {
    departmentRepo.insert(req.body)
        .then(insertId => {
            res.statusCode = 201;
            res.json(req.body);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end();
        });
});

router.put('/:id', authRepo.verifyAccessToken, (req, res) => {
    if (isNaN(req.params.id)) {
        res.statusCode = 400;
        res.json({
            msg: 'error'
        });

        return;
    }
    
    departmentRepo.update(req.params.id, req.body)
        .then(payroll => {
            res.statusCode = 200;
            res.json(req.body);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end();
        });
});

router.delete('/:id', authRepo.verifyAccessToken, (req, res) => {
    if (isNaN(req.params.id)) {
        res.statusCode = 400;
        res.json({
            msg: 'error'
        });

        return;
    }
    
    departmentRepo.delete(req.params.id)
        .then(payroll => {
            res.statusCode = 200;
            res.json(req.body);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end();
        });
});

module.exports = router;