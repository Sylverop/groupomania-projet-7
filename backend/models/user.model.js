const mongoose = require("mongoose");
const { isEmail } = require("validator");
const uniqueValidator = require("mongoose-unique-validator");


const userSchema = new mongoose.Schema(
    {
    name: { type: String,required: true, minlength: 3, maxlength: 55, unique: true, trim: true },
    email: { type: String, required: true, validate: [isEmail], lowercase: true, unique: true, trim: true},
    password: { type: String, required: true, max: 1024, minlength: 6},   
    likes: { type: [String] },
    isAdmin: {type: Boolean, defaultValue: false},
    },
    {
      timestamps: true,
    }
  );
  
  userSchema.plugin(uniqueValidator);

  module.exports = mongoose.model("User", userSchema);


