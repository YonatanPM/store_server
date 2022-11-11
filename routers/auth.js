const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const router = express.Router();
const _ = require("lodash");
const Joi = require("joi");

// the user will supply email and password for authentication
// and will receive an authorization token that will be used in the shopping list and user endpoint of express

router.post("/", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  res.json({ token: user.generateAuthToken() });
});

function loginValidation(req) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(req);
}

module.exports = router;
