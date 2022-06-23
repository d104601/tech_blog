const router = require('express').Router();
const { User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get("/", withAuth, async (req, res) => {
    try {
        const dashboard = await Post.findAll({
            where: {
                userId: req.session.user_id
            },
        })

        const posts = dashboard.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    } catch (err) {
        res.status(500).json(err); 
    }
})
module.exports = router;
