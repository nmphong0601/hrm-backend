var express = require('express');
var employeeRepo = require('../repos/employeeRepo');

var router = express.Router();

router.get('/', (req, res) => {
    employeeRepo.loadAll().then(rows => {
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

    // employeeRepo.loadPage(page).then(rows => {
    //     var hasMore = rows.length > constants.EMPLOYEE_PER_PAGE;
    //     if (hasMore) {
    //         rows.pop();
    //     }

    //     var data = {
    //         employees: rows,
    //         hasMore: hasMore
    //     }
    //     res.json(data);
    // }).catch(err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('View error log on console.');
    // });
});

router.get('/:id', (req, res) => {
    if (req.params.id) {
        var id = req.params.id;
        var employee = {};

        if (isNaN(id)) {
            res.statusCode = 400;
            res.end();
            return;
        }

        employeeRepo.load(id).then(employees => {
            if (employees.length > 0) {
                res.json(employees[0]);
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

module.exports = router;