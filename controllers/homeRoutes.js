const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", withAuth, async (req,res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'created_at', 'title', 'content'],
      include: [
        {
          model: Comment,
          attributes: ["id", "content", "postId", "userId"],
          include: {
            model: User,
            attributes: ["username"]
          }
        }
      ]
    });
    const posts = postData.map(post => post.get({ plain: true}));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
      const dashboard = await Post.findAll({
          where: {
              userId: req.session.user_id
          },

          include:[{model: User}, {model:Comment}]
      })

      const posts = dashboard.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
  } catch (err) {
      res.status(500).json(err); 
  }
})

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/');
      return;
  }

  res.render('login');
});

router.get("/signup", async (req, res) => {
  res.render("signup");
})


module.exports = router;
