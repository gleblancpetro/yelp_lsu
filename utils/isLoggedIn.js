const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		console.log('IS LOGGED IN')
		return next();
	} else {
		console.log('NOT LOGGED IN')
		res.redirect('/login')
		
	}
}

module.exports = isLoggedIn;