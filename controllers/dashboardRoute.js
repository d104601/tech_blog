const router = require('express').Router();
const { User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get("/", withAuth, async (req, res) => {
    try {
      const posts = await Post.findAll({
        where: {
          userId: req.session.id,
        },
      });
  
      const blogposts = posts.map((blogpost) =>
        blogpost.get({ plain: true })
      );
      res.render("dashboard", {
        blogposts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/add", withAuth, async (req, res) =>{
    try {
        res.render("addPost", {
            logged_in: req.session.logged_in,
        }); 
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
