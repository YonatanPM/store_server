const express = require("express");
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/users");
const router = express.Router();
const _ = require("lodash");
const auth = require("../middleware/auth");

// user end point using auth midlleware

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return res.status(404).send("user not found");
  }
  res.send(user);
});

//only store owner could get any user
router.get("/get_user_for_admin", async (req, res) => {
  const user = await User.findById(req.body._id);
  if (!user) {
    return res.status(404).send("user not found");
  }
  res.send(user);
});

//only store owner could delete user

router.delete("/", async (req, res) => {
  const user = await User.findOneAndDelete(req.body._id);
});

//user creation endpoint for new user signup

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already exists");
  user = new User(req.body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.status(200).send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
