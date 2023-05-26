const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 6,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required : true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    role: {
        type: String,
        default: "user",
      },
    resetPasswordToken: String,
    resetPasswordDate: Date,
})

// userSchema.set('toJSON', {
//     transform: (document, returnedDocument) => {
//         returnedDocument.id = document._id.toString()
//         delete returnedDocument._id
//         delete returnedDocument.__v
//         delete returnedDocument.password
//     }
// })


// hash the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  // generate a token for each user that is jwt token
  userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  
  // compare the password with the hashed password
  userSchema.methods.comparePassword = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password);
  };
  
  
  module.exports = mongoose.model("User", userSchema);
  