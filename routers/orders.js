const express = require("express");
const _ = require("lodash");
const { Order, validateOrder } = require("../models/orders");
const auth = require("../middleware/auth");
const router = express.Router();

// all users will be able to create new order

router.post("/", auth, async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let order = await Order.findById(Order.id);
  if (order) return res.status(400).send("order already exists");

  order = new Order(req.body);

  post = await order.save();
  res.send(post);
});

// the owner and users will be able see the order by its id

router.get("/", async (req, res) => {
  const order = await Order.findById(req.body._id);
  if (!order) {
    return res.status(404).send("order not found");
  }
  return res.status(200).send(order);
});

//only the store owner can delete order

router.delete("/", async (req, res) => {
  const order = await Order.findByIdAndDelete(req.body._id);
  if (!order) {
    return res.status(404).send("order not found");
  }
});

module.exports = router;
