const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", withAuth, async (req,res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'time', 'title', 'content'],
      include: [
        {
          model: Comment,
          attributes: ["id", "time", "content", "postId", "userId"],
          include: {
            model: User,
            attributes: ["username"]
          }
        }
      ]
    });

  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.get("/dashboard", async (req, res) => {});

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/');
      return;
  }

  res.render('login');
});

router.get("/logout", async (req, res) => {
    
});

module.exports = router;
