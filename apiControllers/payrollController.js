var express = require('express');

var payrollRepo = require('../repos/payrollRepo'), 
    authRepo = require('../repos/authRepo');

var router = express.Router();

router.get('', authRepo.verifyAccessToken, (req, res) => {
    var user = req.token_payload.user;
    payrollRepo.loadAll()
        .then(rows => {
            res.json(rows);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});

router.get('/employee/:employee_oid', authRepo.verifyAccessToken, (req, res) => {
    if (isNaN(req.params.employee_oid)) {
        res.statusCode = 400;
        res.json({
            msg: 'error'
        });

        return;
    }
    payrollRepo.loadByEmployee(req.params.employee_oid)
        .then(rows => res.json(rows))
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});

router.get('/:id', authRepo.verifyAccessToken, (req, res) => {
    if (isNaN(req.params.id)) {
        res.statusCode = 400;
        res.json({
            msg: 'error'
        });

        return;
    }

    payrollRepo.load(req.params.id)
        .then(rows => res.json(rows))
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});

router.post('', authRepo.verifyAccessToken, (req, res) => {
    payrollRepo.insert(req.body)
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
    
    payrollRepo.update(req.params.id, req.body)
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
    
    payrollRepo.delete(req.params.id)
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