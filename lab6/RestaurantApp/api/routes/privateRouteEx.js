const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: "Top secret post",
            description: "You have to be logged in to see this conent!"
        }
    })
});

module.exports = router;