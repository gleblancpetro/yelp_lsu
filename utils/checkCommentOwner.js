const Comment = require('../models/comment')


const checkCommentOwner = async (req, res, next) => {

		  if (req.isAuthenticated()) {
			const comment = await Comment.findById(req.params.commentId).exec();
			console.log(comment.user.id)
			console.log(req.user._id)

			if (comment.user.id.equals(req.user._id)) {

				next();
				
			} else {

				res.redirect('back')

			}


		} else {
			res.redirect('/login')
		}	
}


module.exports = checkCommentOwner;
