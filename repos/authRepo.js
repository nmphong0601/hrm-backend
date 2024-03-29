var randtoken = require('rand-token'),
    jwt = require('jsonwebtoken'),
    moment = require('moment');

var db = require('../fn/postgresql-db'),
    opts = require('../fn/opts');

//
// acccess-token

exports.generateAccessToken = userObj => {
    var payload = {
        user: userObj,
        info: 'more info for you'
    }
    var token = jwt.sign(payload, opts.ACCESS_TOKEN.SECRET_KEY, {
        expiresIn: opts.ACCESS_TOKEN.LIFETIME
    });

    return token;
}

exports.verifyAccessToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    
    if (token) {
        jwt.verify(token, opts.ACCESS_TOKEN.SECRET_KEY, (err, payload) => {
            if (err) {
                // res.statusCode = 401;
                // res.json({
                //     msg: 'verify failed',
                //     error: err
                // });
                return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
            } else {
                req.token_payload = payload;
                next();
            }
        });
    } else {
        res.statusCode = 403;
        res.json({
            msg: 'No token found'
        });
    }
};

//
// refresh-token

exports.generateRefreshToken = () => {
    return randtoken.generate(opts.REFRESH_TOKEN.SIZE);
}

exports.updateRefreshToken = (id, refreshToken) => {
    return new Promise((resolve, reject) => {
        var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
        var sql = `delete from userrefreshtokenext where oid = ${id}`;
        db.delete(sql)
            .then(affectedRows => {
                sql = `insert into userrefreshtokenext values(${id}, '${refreshToken}', '${rdt}')`;
                return db.insert(sql);
            })
            .then(insert_id => {
                resolve(true);
            })
            .catch(err => reject(err));
    });
}

exports.verifyRefreshToken = refreshToken => {
    var sql = `select * from userRefreshTokenExt where refresh_token = '${refreshToken}'`;
    return db.load(sql);
}

exports.deleteRefreshToken = id => {
    var sql = `delete from userRefreshTokenExt where oid = ${id}`;
    return db.delete(sql);
}