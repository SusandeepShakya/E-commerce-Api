const User = require("../models/User");
const verifyTokenAuthorization = require("./verifyToken");
const router = require("express").Router();

//update
router.put("/:id", async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET,
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err);
    }
});

//Delete 
router.delete("/:id", async (req,res) => {
   try{
    await User.findByIdAndDelete(req.params.id);
    res.status(401).json("User Deleted");
}catch(err){
       res.status(401).json(err);
   }
});

//get user

router.get("/find/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //get Every  user

router.get("/findAll/", async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
