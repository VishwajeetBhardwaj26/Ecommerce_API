const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes= require("./routes/userRoutes");
const authRoutes = require("./routes/authUser");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");

//Configuring dot env 
dotenv.config();

mongoose
  .connect(process.env.mongo_url)
  .then(() => {
    console.log("Database connected successfully...");
  })
  .catch((err) => {
    console.log(err);
  });
  app.use(express.json());
  app.use(cors());
//Route definition
  app.use("/api/auth",authRoutes);
  app.use("/api/users",userRoutes);
  app.use("/api/products",productRoutes);
  app.use("/api/cart",cartRoutes);
  app.use("/api/order",orderRoutes);
app.listen(process.env.portNo||3001, () => {
  console.log(`Backend is up and running at port:${process.env.portNo}`);
})
