const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
//tell passport to use new strategy for google login
passport.use(new googleStrategy({

    clientID:"120550297793-n37fhfhev7grebg04g5u2m4r9fvsq49o.apps.googleusercontent.com",
    clientSecret:"SZ_GAhlMkWBUTvZIOg5m8NVz",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},function(accessToken,refreshToken,profile,done){
//find a user
User.findOne({email:profile.emails[0].value}).exec(function(err,user){
if(err)
{
    console.log(err);
    return;
    
}
console.log(profile);
if(user)
{
    //if found set this user as req.user
    return done(null,user);
}
else{
    //if not found create user and set it as req.user
    User.create({
name:profile.displayName,
email:profile.emails[0].value,
password:crypto.randomBytes(20).toString('hex')



    },function(err,user){
        if(err)
{
    console.log(err);
    return;
    
}
else{
    return done(null,user);
}
    });
}

})

}));
module.exports=passport;