const router = require("express").Router();


router.get("/usertest", (req, res) => {
    res.send("test Successful");
})
router.post("/userpost", (req,res) => {
    const username = req.body.username;
    res.send(`the Username is ${username}`);
})

module.exports = router;
