const Staff = require("../models/Kavishka/Staff");
const jwt = require("jsonwebtoken");


const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const staff = await Staff.login(email, password);

    const token = createToken(user._id);

    const name = staff.name;

    res.status(200).json({ email, token, name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};


const signupUser = async (req, res) => {
  const {name,email,role,phoneNumber,password } = req.body;

  try {
    const user = await Staff.signup(name,email,role,phoneNumber,password);

    const token = createToken(user._id);

    res.status(200).json({ email,user});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
