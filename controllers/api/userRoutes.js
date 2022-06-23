const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", async (req, res) =>{
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
    
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) =>{
    try {
        const user = await User.findByPk(req.params.id, {
            include: [
                { model: Post },
                { model: Comment }
            ]
        });
        if(!user) {
            res.status(404).json({ message: "No user in this id"});
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    try{
        const user = await User.create(req.body);
        req.session.save(() =>{
            req.session.id = user.id;
            req.session.username = user.username;
            req.session.logged_in = true;

            res.json(user);
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) =>{
    try {
        const user = await User.findOne({
            where: {username: req.body.username}
        });
        if(!user) {
            res.status(400).json({ message: "No user in this username"});
            return;
        }

        if(user.checkPassword(req.body.password)) {
            req.session.save(() =>{
                req.session.id = user.id;
                req.session.username = user.username;
                req.session.logged_in = true;
    
                res.json(user);
            });
        }
        else {
            res.status(400).json({ message: "wrong password"});
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
});

module.exports = router;