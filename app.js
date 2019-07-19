const express = require("express");
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const UserDetails = require('./models/authModels');
const LocalStrategy = require('passport-local').Strategy;

const PORT = 3000;

// Parse URL-encoded bodies (as sent by HTML forms)
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));



//mise en place de passport

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome " + req.query.username + "!!"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
        cb(err, user);
    });
});



passport.use(new LocalStrategy(
    function (username, password, done) {
        UserDetails.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (user.password != password) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));
app.post('/',
    passport.authenticate('local', { failureRedirect: '/error' }),
    function (req, res) {
        res.redirect('/admin');
    });

// set the view engine to ejs
app.set('view engine', 'ejs');//les views seront ds le dossier ./views
app.set('views', 'views');//le moteur de view choisi est  'ejs'

//lien pour créer js et css
app.use(express.static('public'));

//utilistion des routes
app.use('/', require("./routes/index"));
app.use('/', require("./routes/admin"));
app.use('/', require('./routes/auth'));




app.listen(PORT, () => console.log(`Allo j'écoute!`));