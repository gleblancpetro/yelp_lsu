const express = require('express');
const Comment = require('../models/comment');
const router = express.Router({mergeParams : true});
const Player = require('../models/players');
const isLoggedIn = require('../utils/isLoggedIn');
const checkCommentOwner = require('../utils/checkCommentOwner')

router.get('/new', isLoggedIn, (req, res) => {
	res.render('comments_new', {playerId : req.params.id})
})

router.post('/', isLoggedIn, async (req, res) => {
	
	try {
			const comment = await Comment.create({
			user : {
				id : req.user._id,
				username : req.user.username
			},
			text : req.body.text,
			playerId : req.body.playerId
		});
			
			console.log(comment)
			res.redirect(`/players/${req.body.playerId}`)
		
	} catch (err) {
		
		console.log(err);
		res.send('you broke it...')
	}
	
	
})

//edit comment
router.get('/:commentId/edit', checkCommentOwner, async (req, res) => {
	
	try { 
		const player = await Player.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec()
		console.log('player',  player);
		console.log('comment', comment)
		res.render('comments_edit', {player, comment});
		
		
	} catch (err) {
		console.log(err);
		res.send('you broke it...edit comment')
	}
	
})

router.put('/:commentId', checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text : req.body.text} , {new : true})
		console.log(comment);
		res.redirect(`/players/${req.params.id}`)
	} catch (err) {
		console.log(err);
		res.send('broke edit put route')
	}
})


router.delete('/:commentId',checkCommentOwner,  async (req, res) => {
	
	try {
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		res.redirect(`/players/${req.params.id}`);
		
	} catch (err) {
		console.log(err);
		res.send('broke delete route')
	}
})


module.exports = router;