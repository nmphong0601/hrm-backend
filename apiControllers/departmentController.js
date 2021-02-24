var express = require('express');
var departmentRepo = require('../repos/departmentRepo');

var router = express.Router();

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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

module.exports = router;