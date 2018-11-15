var moment = require('moment');

var db = require('../database/mysql-db');
var md5 = require('crypto-js/md5');

exports.updateRefreshToken = (username,rfToken) => {
    var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
    var sql = `insert into refresh_token (username, token, date_create) values('${username}', '${rfToken}', '${rdt}')`;
    return db.insert(sql);
}

exports.deleteRefreshTokenByUsername = (username) => {
    return `delete from refresh_token where username = '${username}'`;
}

exports.findUserByUsernameAndPassword = (username,passwordEncrypt) => {
    var sql = `select * from users where username = '${username}' and password = '${passwordEncrypt}'`;
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

// exports.add = userEntity => {

//     var md5_pwd = md5(userEntity.password);
//     var sql = `insert into users(username, password, name, email, dob, permission) values('${userEntity.username}', '${md5_pwd}', '${userEntity.name}', '${userEntity.email}', '${userEntity.dob}', ${userEntity.permission})`;

//     return db.insert(sql);
// }