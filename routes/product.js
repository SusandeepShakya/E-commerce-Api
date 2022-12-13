const Product = require("../models/Product");
const verifyTokenAuthorization = require("./verifyToken");
const router = require("express").Router();


//Creating Product
router.post("/", async (req, res) => {
    const product = new Product(req.body);
    try {
        const createProduct = await product.save();
        res.status(200).json(createProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});


//update
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete 
router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(401).json("Product Deleted");
    } catch (err) {
        res.status(401).json(err);
    }
});

//get Produuct

router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //get Every  user

// router.get("/findAll/", async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


module.exports = router;
