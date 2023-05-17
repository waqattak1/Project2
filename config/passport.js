const path = require('path')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models/user')
require('dotenv').config({ path: path.resolve(__dirname,'../.env')})
console.log('peek env', process.env.GOOGLE_SECRET)

passport.use(
	new GoogleStrategy({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK,
		},
		async function (accessToken, refreshToken, profile, cb) {
			try {
				let user = await User.findOne({ googleId: profile.id })
				if (user) return cb(null, user) 

				user = await User.create({
					name: profile.displayName,
					googleId: profile.id,
					email: profile.emails[0].value,
					avatar: profile.photos[0].value,
				})

				return cb(null, user)
			} catch (err) {
				return cb(err)
			}
		}
	)
)

passport.serializeUser(function (user, cb) {
	cb(null, user._id)
})

passport.deserializeUser(function (userId, cb) {
	User.findById(userId)
        .then(userDoc => cb(null, userDoc))
        .catch(error => cb(error))
})
