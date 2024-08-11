const express = require('express');
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require('../models/user-model');

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });


});

router.get("/shop", isLoggedIn, async (req, res) => {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });

});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate("cart");

  const bill = Number(user.cart[0].price) - Number(user.cart[0].discount);
  console.log(bill);
 
  let totalBill = 0
  user.cart.forEach(item => {
    totalBill += (Number(item.price) - Number(item.discount));

  });

  
  res.render("cart", {user,bill,totalBill});

})

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email })
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Item added to cart");
  res.redirect("/shop");

  console.log(req.user.email, req.user.fullname);

});

router.get("/admin", isLoggedIn, (req, res) => {
  res.render("admin");
})



router.get("/logout", isLoggedIn, (req, res) => {
  res.render("index");
})

module.exports = router;
