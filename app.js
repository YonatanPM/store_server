// import from files and libraries

const express = require("express");
const mongoose = require("mongoose");
const users = require("./routers/users");
const items = require("./routers/items");
const orders = require("./routers/orders");
const auth = require("./routers/auth");

//define app as instance of express framework
const app = express();

//connect to mongoDB database by useing the mongoose library
mongoose
  .connect("mongodb://localhost/veggis_store")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

//middleware that makes any conection to app server throgh json file

app.use(express.json());

//connect to app endpoints

app.use("/api/users", users);
app.use("/api/orders", orders);
app.use("/api/items", items);
app.use("/api/auth", auth);

const port = 3000;
app.listen(port, () => console.log(`listenning to ${port}`));
