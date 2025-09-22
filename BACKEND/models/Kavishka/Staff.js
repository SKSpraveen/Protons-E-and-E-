const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;
const StaffSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  role: {
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
StaffSchema.statics.signup = async function (name, email, role, phoneNumber, password) {
  
  if (!name || !email || !password || !role || !phoneNumber) {
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

  const staff = await this.create({ name, email, role, phoneNumber, password });

  return staff;
};


// static login method
StaffSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const staff = await this.findOne({ email });

  if (!staff) {
    throw new Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, staff.password);

  if (!match) {
    throw new Error('Incorrect password');
  }

  return staff;
}

module.exports = mongoose.model("StaffDetails", StaffSchema);
