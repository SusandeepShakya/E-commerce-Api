const User = require("../models/User");
const verifyTokenAuthorization = require("./verifyToken");
const router = require("express").Router();

//create Cart
router.post("/", async (req, res) => {
    const cart = new Cart(req.body);
    try {
        const createCart = await cart.save();
        res.status(200).json(createCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update Cart

router.put("/:id", async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body;
        },
            { $new: true }
        );
        res.status(200).json(updatedCart);

    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete Cart
router.delete("/:id", async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart Deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

//getUserCart
router.get("/find/:id", async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.params.userId })
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get All Cart
router.get("/", async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
