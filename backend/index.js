const express = require("express");
const cors = require("cors");
require("./db/config");
const Users = require("./db/User");
const app = express();
const Product = require("./db/Product");

app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  let user = new Users(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});
app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await Users.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "No user found" });
  }
});

app.post('/add-product', async (req, res)=> {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.listen(5000);
