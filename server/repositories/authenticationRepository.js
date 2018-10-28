var jwt = require('jsonwebtoken');
var rndToken = require('rand-token');
var moment = require('moment');

var db = require('../database/mysql-db');
var md5 = require('crypto-js/md5');

const SECRET = 'ABCDEF';
const AC_LIFETIME = 6; // seconds

exports.generateAccessToken = userEntity => {
    var payload = {
        user: userEntity,
        info: 'more info'
    }

    var token = jwt.sign(payload, SECRET, {
        expiresIn: AC_LIFETIME
    });

    return token;
}

exports.verifyAccessToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    console.log(token);

    if (token) {
        jwt.verify(token, SECRET, (err, payload) => {
            if (err) {
                res.statusCode = 401;
                res.json({
                    msg: 'INVALID TOKEN',
                    error: err
                })
            } else {
                req.token_payload = payload;
                next();
            }
        });
    } else {
        res.statusCode = 403;
        res.json({
            msg: 'NO_TOKEN'
        })
    }
}

exports.generateRefreshToken = () => {
    const SIZE = 80;
    return rndToken.generate(SIZE);
}

exports.updateRefreshToken = (username, rfToken) => {
    return new Promise((resolve, reject) => {

        var sql = `delete from refresh_token where username = '${username}'`;
        db.insert(sql) // delete
            .then(value => {
                var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
                sql = `insert into refresh_token (username, token, date_create) values('${username}', '${rfToken}', '${rdt}')`;
                console.log(sql);
                return db.insert(sql);
            })
            .then(value => resolve(value))
            .catch(err => reject(err));
    });
}

exports.add = userEntity => {

    var md5_pwd = md5(userEntity.password);
    var sql = `insert into users(username, password, name, email, dob, permission) values('${userEntity.username}', '${md5_pwd}', '${userEntity.name}', '${userEntity.email}', '${userEntity.dob}', ${userEntity.permission})`;

    return db.insert(sql);
}

exports.login = loginEntity => {
    var md5_pwd = md5(loginEntity.pwd);
    var sql = `select * from users where username = '${loginEntity.username}' and password = '${md5_pwd}'`;
    console.log(sql);
	return db.load(sql);
}

exports.findUserByUsername = username => {
	var sql = `select * from users where username = '${username}'`;
	return db.load(sql);
}

exports.findRefreshToken = (username,refreshToken) => {
    var sql = `select * from refresh_token where username = '${username}' and token = '${refreshToken}'`;
    console.log(sql);
	return db.load(sql);
}






