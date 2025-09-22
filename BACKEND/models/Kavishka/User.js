const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator =require("validator")
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  address: {
    type: String,
    required: true
  },
 phoneNumber: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});
// static signup method
userSchema.statics.signup = async function (name,email,address,phoneNumber,password) {
 
 
  if (!name || !email || !password ||!address ||!phoneNumber) {
    throw new Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Password not strong enough')
  }

  
  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already in use");
  }
      
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name,email,address,phoneNumber,password: hash});

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {

  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Incorrect password');
  }

  return user;
}

module.exports = mongoose.model("UserDetails", userSchema);
