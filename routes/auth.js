const express = require('express');
const router = express.Router()
const User = require('../models/user')
const passport = require("passport")

//sign up new

router.get('/signup', (req, res)=> {
	res.render('signup')
} )


//sign up create
router.post('/signup', async (req, res)=> {

	try {
		const newUser = await User.register(new User ({
			username : req.body.username, 
			email : req.body.email
		}), 
		req.body.password);
		
		console.log(newUser);
		passport.authenticate('local')(req, res, ()=> {
			res.redirect('/players')
		})
		
	} catch (err) {
		console.log(err)
		res.send('error in signing up')
	}


})


//login

router.get('/login', (req, res)=> {
	res.render("login")
})


router.post('/login',  passport.authenticate('local', {
	successRedirect : "/players",
	failureRedirect : "/login"
}))

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/players')
})

module.exports = router;