const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const ownerRouter = require("./routes/ownerRouter");
const usersRouter = require("./routes/usersRouter");
const productsrouter = require("./routes/productRouter");

const db = require("./config/mongoose-connection");


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use("/owners", ownerRouter);
app.use("/users", usersRouter);
app.use("/product", productsrouter);

app.listen(3000);