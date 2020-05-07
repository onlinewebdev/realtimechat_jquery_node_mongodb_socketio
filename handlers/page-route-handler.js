const queryHandler = require('./../handlers/query-handler');
const CONSTANTS = require('./../config/constants');
const passwordHash = require('./../utils/password-hash');
const ejs = require('ejs');

'use strict';
class PageRouteHandler{

	index(req, res){
        if(req.user == null) res.redirect('/login');
        else res.redirect('/home');
    }
    
    login(req, res) {
        if(req.user != null) return res.redirect('/home');

        res.render('login.ejs');
    }

    register(req, res) {
        if(req.user != null) return res.redirect('/home');

        res.render('registration.ejs');
    }

    home(req, res) {
        if(req.user == null) return res.redirect('/login');

        res.render('home.ejs', { user: req.user });
    }

    async chat(req, res) {
        if(req.user == null) return res.redirect('/login');

        let userlist = await queryHandler.getChatList(req.user._id);

        res.render('chat.ejs', { user: req.user, userlist: userlist });
    }

    aboutus(req, res) {
        if(req.user == null) return res.redirect('/login');

        res.render('aboutus.ejs', { user: req.user });
    }

    async logout(req, res) {
        req.session.user = null;
        
        await queryHandler.makeUserOnline(req.user._id, 'N');
        
        return res.redirect('/login');

    }
}

module.exports = new PageRouteHandler();
