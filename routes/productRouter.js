const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");


router.post("/create", upload.single("image"), async (req, res) => {

   try{ let { name, price, discount, panelcolore, bgcolor, textcolore } = req.body;

    let product = await productModel.create({
        image: req.file.buffer,
        name, 
        price, 
        discount,
         panelcolore,
         bgcolor, 
        textcolore,

    });
    req.flash("success", "prosuct Created Successfully");
    res.redirect("/owners/admin");
}catch(err){
    res.send(err.message);
}
});



module.exports = router; 