const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
	name : String,
	description : String, 
	sport : String, 
	startDate: Date, 
	endDate : Date, 
	number : Number,
	professional : Boolean,
	image : String, 
	owner : {
		id : {
			
			type : mongoose.Schema.Types.ObjectId,
			ref : "User"
		},
		
		username : String
		
	}
	
	
});

playerSchema.index({
	'$**' : 'text'
});

const Player = mongoose.model('player', playerSchema);

module.exports = Player;

