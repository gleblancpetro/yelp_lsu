const express = require('express');
const router = express.Router();
const Player = require('../models/players')
const Comment = require('../models/comment')
const isLoggedIn = require('../utils/isLoggedIn');
const checkPlayerOwner = require('../utils/checkPlayerOwner')

router.get('/', async (req, res) => {
	console.log(req.user);
	try {
		const players = await Player.find().exec()
		res.render('players', {players : players})

	} catch (err) {
		console.log(err)
		res.send('you broke it.../index')
	}

})


router.post('/', isLoggedIn, async (req, res) => {
	const sport = req.body.sport.toLowerCase();
	
	const newPlayer = {
		name : req.body.name,
		description : req.body.description,
		sport : sport,
		startDate : req.body.startDate,
		endDate : req.body.endDate, 
		number : req.body.number,
		professional : !!req.body.profesional,
		image : req.body.image,
		owner : {
			id : req.user._id,
			username : req.user.username
		}
	};
		
	try{ 
	
		 const player = await Player.create(newPlayer)
		 console.log(player)
		res.redirect('/players');

		
	} catch (err) {
		console.log(err)
		res.send('you broke it.../post')
	}

	
})

router.get("/new", isLoggedIn, (req, res) => {
	res.render("players_new");
})

router.get('/search', async (req, res) => {
	
	try {
		const players = await Player.find({
			$text : {
				$search : req.query.term
			}
		});
		
		res.render('players', {players});
		
	} catch (err) {
		
		console.log(err);
		res.send('you broke search')
	}
});


router.get('/:id', async (req, res) => {
	try{
		const player = await Player.findById(req.params.id).exec()
		const comments = await Comment.find({playerId : req.params.id}).exec()
		res.render("players_show", {player, comments})
		
	} catch (err) {
		
		console.log(err)
		res.send('you broke it.../playrs/id')
	}
	
		

});




router.get('/:id/edit', checkPlayerOwner, async (req, res) => {
	//get comic from DB
	
	const player = await Player.findById(req.params.id).exec()
	res.render("players_edit", {player})
})

router.put('/:id', checkPlayerOwner, async (req, res) => {
	
	const sport = req.body.sport.toLowerCase();
	const playerBody = {
		name : req.body.name,
		description : req.body.description,
		sport : sport,
		startDate : req.body.startDate,
		endDate : req.body.endDate, 
		number : req.body.number,
		professional : !!req.body.profesional,
		image : req.body.image
	}

	try { 
		const player = await Player.findByIdAndUpdate(req.params.id, playerBody, {new :true}).exec();
		console.log(player)
		res.redirect(`/players/${req.params.id}`)
		
		
	} catch (err) {
		console.log(err);
		res.send('you broke put route')
	}

})


router.delete("/:id", checkPlayerOwner, async (req, res) => {
	try{
		
		const player = await Player.findByIdAndDelete(req.params.id).exec()
		res.redirect('/players')
		
	} catch (err) {
		
		console.log(err)
		res.send('you broke delete route')
	}
})






module.exports = router;
