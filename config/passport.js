const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

module.exports = function (passport){
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClinetID,
            clientSecret: keys.googleClientSecret,
            callback:'/auth/google/callback',
            proxy: true
        })
    )
}