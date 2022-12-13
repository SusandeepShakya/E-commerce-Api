const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");


const app = express();
dotenv.config();
mongoose.set('strictQuery', false);
app.use(express.json());


//DB Connection
mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => {
        console.log(err);
    });


//Routes
app.use("/api/users", userRoute, );
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

//Server
app.listen(process.env.PORT || 4000, () => {
    console.log("backend suerver is running");
});