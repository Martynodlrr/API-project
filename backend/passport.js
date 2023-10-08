const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const { User } = require('../../db/models');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
        // Use the profile info to check if the user exists in your DB
        // If not, create a new user
        // Otherwise, return the existing user
        let user = await User.findOne({ where: { googleId: profile.id } });
        if (!user) {
            user = await User.create({ googleId: profile.id, /* other fields like email, username, etc. from the profile object */ });
        }
        return done(null, user);
    })
);

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
        // Use the profile info to check if the user exists in your DB
        // If not, create a new user
        // Otherwise, return the existing user
        let user = await User.findOne({ where: { googleId: profile.id } });
        if (!user) {
            user = await User.create({ googleId: profile.id, /* other fields like email, username, etc. from the profile object */ });
        }
        return done(null, user);
    })
);

passport.use(new Auth0Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
}, async (accessToken, refreshToken, extraParams, profile, done) => {
        let user = await User.findOne({ where: { githubId: profile.id } });
        if (!user) {
            user = await User.create({ githubId: profile.id, /* other fields like email, username, etc. from the profile object */ });
        }
        return done(null, user);
    })
);

module.exports = passport;
