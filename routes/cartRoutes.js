const router = require("express").Router();
const Cart = require("../models/Cart");
const {
  verifyJwt,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyJwt");

//Create Cart
router.post("/create", verifyJwt, async (req, res) => {
  const newCartDetail = new Cart(req.body);
  try {
    const dbSavedResponse = await newCartDetail.save();
    res.status(200).json(dbSavedResponse);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Update Cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    let updatedResponse = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedResponse);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Delete Cart
router.delete(
  "/delete/:id",
  verifyJwt,
  async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted Successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL

router.get("/allCart", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
