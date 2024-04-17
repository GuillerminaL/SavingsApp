import 'dotenv/config';

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import authRouter from './routes/auth';
import currenciesRoutes from './routes/currencies';
import tagsRoutes from './routes/tags';
import savingsRoutes from './routes/savings';
import movementsRoutes from './routes/movements';
import { get404, get500 } from './controllers/error';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
/* Intialize passport for google login */
app.use(passport.initialize());
/* add express session before passport session (required by express) */
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: `${process.env.GOOGLE_CLIENT_SECRET}` 
}));
app.use(passport.session());




let userProfile: any = null;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; 

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken: any, refreshToken: any, profile: any, done: any) {
        /* check if user profile is in database or create new one */
        userProfile = profile;
        return done(null, userProfile);
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});
  
passport.deserializeUser(function(obj: any, cb) {
    cb(null, obj);
});

app.use(cors({ origin: 'http://localhost:3000',
credentials: true // Allow credentials (cookies) to be sent cross-origin
}));

//CORS - Access-Control-Allow-Origin
/*
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
*/

app.use('/auth', authRouter);
app.use('/currencies', currenciesRoutes);
app.use('/tags', tagsRoutes);
app.use('/savings', savingsRoutes);
app.use('/movements', movementsRoutes);
app.use(get404);

const connectToMongoDB = () => {
    mongoose
    .connect(`${process.env.MONGODB_URL}`)
    .then(() => {
        // app.listen(port);
        console.log('Connected to MongoDB...');
    })
    .catch((err) => {
        console.log('Error in connecting to MongoDB...' + err);
        app.use(get500);
    });
}

connectToMongoDB();


// app.get('/', function(req, res) {
//     res.render('./views/auth');
// });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


