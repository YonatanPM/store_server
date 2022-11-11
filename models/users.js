const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  homeAddress: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1024,
  },
});

userSchema.methods.generateAuthToken = function generateAuthToken() {
  const token = jwt.sign({ _id: this._id }, config.get("jwtKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    phone: Joi.string().min(9).max(10).required(),
    password: Joi.string().min(6).max(1024).required(),
    homeAddress: Joi.string().min(10).max(1024).required(),
  });

  return schema.validate(user);
}

module.exports = { User, validateUser };
