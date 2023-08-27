const passport = require('passport');
const User = require('../models/user');

exports.signupGet = (req, res) => {
    res.render('signup', { title: 'Sign Up' });
};

exports.signupPost = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.redirect('/login');
    } catch (error) {
        next(error);
    }
};

exports.loginGet = (req, res) => {
    res.render('login', { title: 'Log In' });
};

exports.loginPost = (req, res) => {
    res.redirect('/');
};

exports.logoutGet = (req, res) => {
    res.render('logout', { title: 'Logout' });
};

exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/authentication/login');
};
