const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");

//the mongoose shecma is used for modeling data that will be inserted by the user request

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    unique: true,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  price: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 5000,
  },
  section: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  quantityInStorage: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 5000,
  },
  sale: {
    type: Boolean,
    required: true,
  },
  pictureUrl: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1204,
  },
});

const Item = mongoose.model("Item", itemSchema);

// joi library will provide accurate error messages for the database users

function validateItem(Item) {
  const schema = Joi.object({
    itemName: Joi.string().min(2).max(255).required(),
    price: Joi.number().min(1).max(5000).required(),
    quantityInStorage: Joi.number().min(1).max(5000).required(),
    section: Joi.string().min(3).max(255).required(),
    sale: Joi.boolean().required(),
    pictureUrl: Joi.string().min(10).max(1024),
  });

  return schema.validate(Item);
}

module.exports = { Item, validateItem };
