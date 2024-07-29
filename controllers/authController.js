
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const { generateToken } = require('../utils/generateToken');


module.exports.registerUser = async (req, res) => {

    try {

        let { email, password, fullname } = req.body;
        let user = await userModel.findOne({ email: email })

        if (user) return res.status(401).send("you have already have a account");

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message)
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    });

                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.send("user created succesfully");

                }
            });
        })
    } catch (err) {
        res.send(err.message);
    }
};

module.exports.loginUser = async (req, res) =>{

    let{email, password}= req.body;

    let user = await userModel.findOne({email: email});
    if(!user) return res.send("Check email or password");

    bcrypt.compare(password, user.password, (err, result)=>{
        if(result){
            let token = generateToken;
            res.cookie("token",token);
            res.send("login successfully");
        }
        else{
            res.send("Check email or password again");
        }

    })

}

module.exports.logout = (req, res)=>{
    req.cookie("token", "");
    res.redirect("/");
}