var express = require('express');

var payrollRepo = require('../repos/payrollRepo');

var router = express.Router();

router.post('/', (req, res) => {
    var user = req.token_payload.user;
    payrollRepo.insert(user.f_ID, req.body)
        .then(rs => {
            res.json({
                msg: 'success'
            });
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});

router.get('/', (req, res) => {
    var user = req.token_payload.user;
    payrollRepo.loadOrdersByUser(user.f_ID)
        .then(rows => res.json(rows))
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});

router.get('/:id', (req, res) => {
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


module.exports = router;