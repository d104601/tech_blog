const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req,res) => {});

router.get("/dashboard", async (req, res) => {});

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }

    res.render('login');
  });

router.get("/logout", async (req, res) => {
    
})