//imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session')

//config

const config = require('./config');

//routes

const playerRoutes = require('./routes/players')
const commentRoutes = require('./routes/comments')
const mainRoutes = require('./routes/main')
const authRoutes = require('./routes/auth')


// const seed = require('./utils/seed');

// seed();

//mongoDB

const mongoose = require('mongoose');
const Player = require('./models/players');
const Comment = require('./models/comment');
const User = require('./models/user');


mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true});


//boiler plate setup

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(expressSession({
	secret : 'oin40r34n98nlnf',
	resave : false, 
	saveUninitialized : false
}))


app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride('_method'))
app.use(morgan('tiny'))

//passport config
app.use(passport.initialize());
app.use(passport.session())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()))

//current user middleware config
//APP.USE ARE THINGS CALLED ON EVERYROUTE
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
})
//use routes

app.use("/players", playerRoutes)
app.use('/', authRoutes);
app.use("/players/:id/comments", commentRoutes)
app.use("/", mainRoutes)


app.listen(3000, () => {
	console.log('Listening on 3000...')
});
