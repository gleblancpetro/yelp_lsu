const Player = require('../models/players')
const Comment = require('../models/comment')

//delete all current player and comments

//create 3 new players

//create new comment for each player

const player_seeds = [
	
{
	name : "LeBrandon Toefield",
	description : "LaBrandon Cordell Toefield (born September 24, 1980) is a former American football running back. He was drafted by the Jacksonville Jaguars in the fourth round of the 2003 NFL draft. He played college football at Louisiana State University.Toefield was also a member of the Carolina Panthers and New York Sentinels.", 
	sport : "football", 
	startDate: "2001-01-01", 
	endDate : "2003-01-01", 
	number : 22,
	professional : false,
	image : "https://i.ebayimg.com/images/g/lwQAAOSwCU1Yp5c0/s-l400.jpg"
	
	
},
	{
	name : "Alex Bregman",
	description : "Alexander David Bregman (born March 30, 1994) is an American professional baseball third baseman and shortstop for the Houston Astros of Major League Baseball (MLB).", 
	sport : "baseball", 
	startDate: "2009-01-01", 
	endDate : "2013-01-01", 
	number : 8,
	professional : true,
	image : "https://bloximages.newyork1.vip.townnews.com/nola.com/content/tncms/assets/v3/editorial/c/51/c5199b79-9e42-54fe-b679-bcd6dc3c56c6/5d1641dd534ba.image.jpg"
	
	
},
	{
	name : "Tyrann Mathieu",
	description : "Tyrann Devine Mathieu (/ˈtaɪrən ˈmæθ.juː/; born May 13, 1992), nicknamed the Honey Badger and the Landlord, is an American football safety for the Kansas City Chiefs of the National Football League (NFL). He played college football for Louisiana State University (LSU). In college he developed a reputation for causing turnovers, setting a Southeastern Conference (SEC) record with 11 career forced fumbles and earning the nickname Honey Badger.", 
	sport : "football", 
	startDate: "2007-01-01", 
	endDate : "2011-01-01", 
	number : 7,
	professional : true,
	image : "https://www.si.com/.image/t_share/MTY4MjYzMjM1MDI1MTg0MDIx/tyrann-mathieu_p1.jpg"
	
	
}
	
	
]


const seed = async () => {
	await Player.deleteMany();
	console.log('Deleted all players')
	
	await Comment.deleteMany();
	console.log('Deleted all comments')
	
	// for (const player_seed of player_seeds) {
		
	// 	let player = await Player.create(player_seed)
	// 	console.log('created new comic', player.title)
	// 	await Comment.create({
	// 		user : "Gerard",
	// 		text : "This is a comment",
	// 		playerId : player._id
			
	// 	})
	// 	console.log('created a new comment')
	// }

}


module.exports = seed;