const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

      fullname: {
        type : String,
      },
      email: String,
      password: String,
      cart : [{
        type :  mongoose.Schema.Types.ObjectId,
        ref: "product",
      }],
      isadmin : Boolean,
      order : {
        type : Array,
        default: [],

      },
      contact : Number,
      picture : String,

});

module.exports =mongoose.model("user", userSchema);