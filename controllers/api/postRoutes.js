const router = require("express").Router();
const {Post, User, Comment} = require("../../models");
const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll({
            include:[ {model: User}, {model: Comment}]
        });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include:[ {model: User}, {model: Comment}]
        });
        
        if (!post) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        res.status(200).json(post);

    } catch(err) {
        res.status(500).json(err);
    }
});

router.post("/", withAuth, async (req, res) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.userId
        });
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);  
    }
});

router.put("/:id", withAuth, async (req, res) => {
    try {
        const post = await Post.update({
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        });
        if (!post) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.status(200).json(post);

    } catch(err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const post = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!post) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);   
    }
});

module.exports = router;