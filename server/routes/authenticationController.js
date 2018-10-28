var express = require('express');

var authRepo = require('../repositories/authenticationRepository');

var router = express.Router();

router.post('/login', (req, res) => {
	authRepo.login(req.body)
		.then(rows => {
			if (rows.length > 0) {
				var userEntity = rows[0];
				var acToken = authRepo.generateAccessToken(userEntity);
				var rfToken = authRepo.generateRefreshToken();

				authRepo.updateRefreshToken(userEntity.f_ID, rfToken)
					.then(value => {
						res.json({
							auth: true,
							user: userEntity,
							access_token: acToken,
							refresh_token: rfToken
						}) 
					})
					.catch(err => {
						console.log(err);
						res.statusCode = 500;
						res.end('View error log on console');
					})
			} else {
				res.json({
					auth: false
				})
			}
		})
		.catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		})
})

router.post('/token', (req, res) => {

	var username = req.body.username;
	var refreshToken = req.body.refreshToken;
	authRepo.findRefreshToken(username,refreshToken).then(rows=>{
		if(rows.length>0){
			authRepo.findUserByUsername(username).then(rows => {
			if (rows.length > 0) {
				var userEntity = rows[0];
				var acToken = authRepo.generateAccessToken(userEntity);
						res.json({
							auth: true,
							user: userEntity,
							access_token: acToken,
							refresh_token: rfToken
						}) 
					 } else {
				res.json({
					auth: false
				})
			}
		})
		.catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		})
		}else{
			res.json({
				auth: false
			})
		}
	})
})

module.exports = router;