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

exports.updateRefreshToken = (userId, rfToken) => {
    return new Promise((resolve, reject) => {

        var sql = `delete from userRefreshTokenExt where ID = ${userId}`;
        db.insert(sql) // delete
            .then(value => {
                var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
                sql = `insert into userRefreshTokenExt values(${userId}, '${rfToken}', '${rdt}')`;
                return db.insert(sql);
            })
            .then(value => resolve(value))
            .catch(err => reject(err));
    });
}

exports.add = userEntity => {

    var md5_pwd = md5(userEntity.Password);
    var sql = `insert into users(f_Username, f_Password, f_Name, f_Email, f_DOB, f_Permission) values('${userEntity.Username}', '${md5_pwd}', '${userEntity.Name}', '${userEntity.Email}', '${userEntity.DOB}', ${userEntity.Permission})`;

    return db.insert(sql);
}

exports.login = loginEntity => {
    var md5_pwd = md5(loginEntity.pwd);
	var sql = `select * from users where f_Username = '${loginEntity.user}' and f_Password = '${md5_pwd}'`;
	return db.load(sql);
}







