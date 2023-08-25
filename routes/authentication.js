const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/signup', userController.signupGet);
router.post('/signup', userController.signupPost);
router.get('/login', userController.loginGet);
router.post('/login', passport.authenticate('local', { failureRedirect: '/authentication/login', successRedirect: '/' }), userController.loginPost);
router.get('/logout', userController.logoutGet);
router.post('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

module.exports = router;
