const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

//Load user model
const User = mongoose.model('users');

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClinetID,
            clientSecret: keys.googleClientSecret,
            callbackURL:'/auth/google/callback',
            proxy: true
        },(accessToken,refreshToken,profile,done)=> {
            //console.log(accessToken);
            //console.log(profile);
            //get the image url and cut out the part after ?
            const image = profile.photos[0].value.substring(0,profile.photos[0].value.indexOf('?'));
            const newUser = {
                googleID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                image: image
            }

            // Check for existing users
            User.findOne({
                googleID: profile.id
            }).then(user => {
                if(user){
                    // Return user if alredy in the db
                    done(null,user);
                }else{
                    //Create user
                    new User(newUser)
                       .save()
                       .then(user => done(null,user));
                }
            })
        })
    );

    passport.serializeUser((user,done) => {
        done(null,user.id);
    });

    passport.deserializeUser((id,done) => {
        User.findById(id)
        .then(user => done(null,user))
    });
}