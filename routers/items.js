const express = require("express");
const _ = require("lodash");
const { Item, validateItem } = require("../models/items");
const router = express.Router();

//only the stroe owner will have acsses to items endpoints

router.post("/", async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let item = new Item({
    itemName: req.body.itemName,
    price: req.body.price,
    quantityInStorage: req.body.quantityInStorage,
    section: req.body.section,
    sale: req.body.sale,
    pictureUrl: req.body.pictureUrl
      ? req.body.pictureUrl
      : "pixabay.com/vectors/not-to-take-pictures-1576438/",
  });

  post = await item.save();
  res.send(post);
});

router.put("/", async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const item = await Item.findOneAndUpdate(
    {
      itemName: req.body.itemName,
    },
    {
      itemName: req.body.itemName,
      price: req.body.price,
      quantityInStorage: req.body.quantityInStorage,
      section: req.body.section,
      sale: req.body.sale,
      pictureUrl: req.body.pictureUrl,
    }
  );
  if (!item) {
    return res.status(404).send("item not found");
  }
});

router.delete("/", async (req, res) => {
  const item = await Item.findOneAndRemove({ itemName: req.body.itemName });
});

router.get("/", async (req, res) => {
  const item = await Item.findOne({ itemName: req.body.itemName });
  if (!item) {
    return res.status(404).send("item not found");
  }
  return res.status(200).send(item);
});

router.get("/get_all", async (req, res) => {
  const itemArray = await Item.find();
  if (!itemArray) return res.status(404).send("could not found any item");

  res.send(itemArray);
});

router.get("/get_by_section", async (req, res) => {
  const itemArray = await Item.find({ section: req.body.section });
  if (!itemArray) return res.status(404).send("could not found any item");

  res.send(itemArray);
});

module.exports = router;
