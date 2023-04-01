const router = require("express").Router();
const Order = require("../models/Order");
const {
  verifyJwt,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyJwt");

//Create Order
router.post("/create", verifyJwt, async (req, res) => {
  const newOrderDetail = new Order(req.body);
  try {
    const dbSavedResponse = await newOrderDetail.save();
    res.status(200).json(dbSavedResponse);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Update Order
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    let updatedResponse = await Order.findByIdAndUpdate(
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
//Delete Order
router.delete(
  "/delete/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted Successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
//GET USER Orders
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.findOne({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL

router.get("/allOrders", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
