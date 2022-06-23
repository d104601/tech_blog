const router = require("express").Router();
const {Post, User, Comment} = require("../../models");
const withAuth = require('../../utils/auth');

router.get("/", async (req, res) =>{
    try {
        const comments = await Comment.findAll();
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", withAuth, async (req, res) => {
    try {
        const comment = await Comment.create({
            content: req.body.content,
            userId: req.session.id,
            postId: req.body.postId
        });
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const comment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;