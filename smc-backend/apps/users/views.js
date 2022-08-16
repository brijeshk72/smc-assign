const jwt = require("jsonwebtoken");
require("dotenv").config();
const _ = require("lodash");

const {User : UserModel} = require("./models");

const userExists = async (email) => {
  return await UserModel.findOne({ email });
};

// signup new user
const signup = async (req, res) => {
  console.log("req=>", req.body);
  const existsUser = await userExists(req.body.email);
  if (existsUser) return res.status(403).json({ error: "Email is taken" });

  const user = await new UserModel(req.body);
  user.save();
  res.status(201).json({ message: "Signup success! Please login" });
};

const signin = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  UserModel.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(401)
        .json({ message: "User with that email does not exists" });
    }

    if (!user.authenticate(password)) {
      return res
        .status(401)
        .json({ message: "User Email and Password mutch be match" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.cookie("t", token, { expiresIn: new Date() + 60 * 60 });
    const { _id, name, email } = user;

    return res.json({
      token,
      user: {
        _id,
        name,
        email,
      },
    });
  });
};

const userById = (req, res, next, id) => {
  UserModel.findById(id)
    .select("name email updatedAt createdAt")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({ message: "User Not Found" });
      }
      req.profile = user; // add profile property as user
      next();
    });
};

const allUsers = (req, res) => {
  UserModel.find((error, users) => {
    if (error) {
      return res.status(400).json({ error });
    }
    res.status(200).json({ users });
  }).select("name email updatedAt createdAt");
};

const getUser = (req, res) => {
  console.log(req.profile);
  res.json(req.profile);
};

const updateUser= (req, res)=>{
  let user = req.profile
  // user.name = req.body.name
  console.log("user : ",user)
  user = _.extend(user, req.body)

  console.log("user : ",user)
  user.save((err)=>{
    if(err){
      return res.status(400).json({error:"You Are Not Authorized for this action"})
    }

  res.json({user})
  })

}

const deleteUser= (req, res)=>{
  let user = req.profile

  user.remove((err)=>{
    if(err){
      return res.status(400).json({error:"You Are Not Authorized for this action"})
    }

  res.json({message:"Account Delete Success"})
  })

}

exports.hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      message: "User is no authorized to perform this action",
    });
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Signup Success!" });
};

module.exports = {
  signup,
  signin,
  signout,
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser
};
