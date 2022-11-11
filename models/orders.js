const { object } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderData: {
    type: Object,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 5000,
  },
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    orderData: Joi.object().min(5).max(5000).required(),
  });

  return schema.validate(order);
}

module.exports = { Order, validateOrder };
