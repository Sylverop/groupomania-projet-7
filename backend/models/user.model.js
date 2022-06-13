const mongoose = require("mongoose");
const { isEmail } = require("validator");
const uniqueValidator = require("mongoose-unique-validator");


const userSchema = new mongoose.Schema(
    {
    pseudo: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 55,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail],
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        minlength: 6,
    },
    imageUrl: {
        type: String,
        default: "./images/user/random-user.png"
      },
      bio :{
        type: String,
        max: 1024,
      },      
      likes: {
        type: [String]
      },
      isAdmin: {
        type: Boolean,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  );
  
  userSchema.plugin(uniqueValidator);

  module.exports = mongoose.model("User", userSchema);


