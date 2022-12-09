const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Registerging
router.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
        });
        const user = await newUser.save();

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json(err);
    }
});


//Loggin in
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(500).json("Wrong Credentials");

        const hashPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
        const userPassword = hashPass.toString(CryptoJS.enc.Utf8);
        userPassword !== req.body.password && res.status(401).json("Wrong PAssword");

        const accessToken = jwt.sign({
            id: user._id, isAdmin: user.isAdmin,
        }, process.env.JWT_SECRET,
            { expiresIn: "3d" }
        )

        const { password, ...others } = user._doc;

        res.status(200).json({...others,accessToken})
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;