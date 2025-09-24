const User = require("../models/Kavishka/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    const name = user.name;

    res.status(200).json({ email, token, name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};


const signupUser = async (req, res) => {
  const {name,email,address,phoneNumber,password } = req.body;

  try {
    const user = await User.signup(name,email,address,phoneNumber,password);

    const token = createToken(user._id);

    res.status(200).json({ email,user});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const bcrypt = require("bcrypt"); // make sure this is imported
const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  console.log("Google OAuth request body:", req.body); // log incoming data

  try {
    let user = await User.findOne({ email });

    if (user) {
      // Existing user, generate token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
      const { password, ...rest } = user._doc;
      return res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(rest);
    } else {
      // New user, create account with placeholders
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
        address: "Not Provided",       
        phoneNumber: "0000000000"      
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
      const { password, ...rest } = newUser._doc;
      return res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    console.error("Google OAuth error:", error);
    return res.status(500).json({ error: "Google auth failed" });
  }
};


module.exports = { signupUser, loginUser, google };
