const Player = require('../models/players')


const checkComicOwner = async (req, res, next) => {
	  
		  if (req.isAuthenticated()) {
			const player = await Player.findById(req.params.id).exec()

			if (player.owner.id.equals(req.user._id)) {

				next();
				
			} else {

				res.redirect('back')

			}


		} else {
			res.redirect('/login')
		}	
}


module.exports = checkComicOwner;
