var jwt = require('jsonwebtoken');
var rndToken = require('rand-token');
var md5 = require('crypto-js/md5');

const SECRET = 'ABCDEF';
const AC_LIFETIME = 1000; // seconds

var authRepo = require('../repositories/authenticationRepository');

exports.login = loginEntity => {
    var md5_pwd = md5(loginEntity.pwd);
    return authRepo.findUserByUsernameAndPassword(loginEntity.username,md5_pwd);
}

exports.updateRefreshToken = (username, rfToken) => {
    return new Promise((resolve, reject) => {

        var sql = authRepo.deleteRefreshTokenByUsername(username);
        db.insert(sql) // delete
            .then(value => {
                return authRepo.updateRefreshToken(username,rfToken);
            })
            .then(value => resolve(value))
            .catch(err => reject(err));
    });
}

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

exports.roleStaff = (req, res, next) => {
    var token = req.headers['x-access-token'];
        jwt.verify(token, SECRET, (err, payload) => {
                if(payload.user.role=="Staff"){
                    next();
                }
                else{
                    res.json({
                        msg: 'You are not the staff'
                    })
                } 
        })
}

exports.roleCustomer = (req, res, next) => {
    var token = req.headers['x-access-token'];
        jwt.verify(token, SECRET, (err, payload) => {
                if(payload.user.role=="Customer"){
                    next();
                }
                else{
                    res.json({
                        msg: 'You are not the customer'
                    })
                } 
        })
}

exports.roleReceiver = (req, res, next) => {
    var token = req.headers['x-access-token'];
        jwt.verify(token, SECRET, (err, payload) => {
                if(payload.user.role=="Receiver"){
                    next();
                }
                else{
                    res.json({
                        msg: 'You are not the receiver'
                    })
                } 
        })
}

exports.generateRefreshToken = () => {
    const SIZE = 80;
    return rndToken.generate(SIZE);
}