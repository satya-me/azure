const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

exports.signup = async (req, res, next) => {
  //

  const hash = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    full_name: req.body.full_name,
    email: req.body.email,
    password: hash,
  });
  const userSave = await user.save();
  const filteredResp = {
    _id: userSave._id,
    full_name: userSave.full_name,
    email: userSave.email,
  };


  res.status(201).json({
    message: "User created successfully",
    res: filteredResp,
  });
};

exports.login = async (req, res, next) => {
  var email = req.body.email;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        data: { error: "User not found! with this " + email },
      });
    } else {
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
        return res.status(401).json({
          data: { error: "Incorrect password!" },
        });
      }
      const token = jwt.sign({
        userId: user._id,
        userEmail: user.email,
        userName: user.full_name,
      }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "1h",
      });


      // Country.find({_id: })
      return res.status(200).json({
        user_details: {
          email: user._id,
          full_name: user.full_name,
          email: user.email
        },
        token: token,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.user = async (req, res, next) => {
  // await User.find({});
  res.send(await User.find({}));
}