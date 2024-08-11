const express = require('express');
const router = express.Router();

const ownerModel = require("../models/owner-model")


router.get("/", (req,res)=> {
    res.send("hello owner");
})

if(process.env.NODE_ENV === "development"){
    router.post("/create" , async (req,res)=>{
    let owners = await ownerModel.find();
    if(owners.length > 0 )
    {
        return res.status(502).send(" you don't have permission to create a new owner");
    }

    let {fullname,email,passward}= req.body;

let createdOwner = await ownerModel.create({
    fullname,
    email,
    passward,

});
    res.status(201).send(createdOwner);

    });
}

router.get("/admin" , (req,res)=>{
    let success = req.flash("success");
    res.render("createproducts" , {success});
})

module.exports = router; 