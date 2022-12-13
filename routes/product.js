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
        res.status(200).json("Product Deleted");
    } catch (err) {
        res.status(401).json(err);
    }
});

//get Produuct

router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all Products

router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
  
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = await Product.find();
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
