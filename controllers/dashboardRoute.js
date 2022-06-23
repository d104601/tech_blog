const router = require('express').Router();
import { User, Post, Comment } from '../models';
import withAuth from '../utils/auth';

router.get("/", withAuth, async (req, res) => {
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

export default router;
