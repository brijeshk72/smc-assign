const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");
const timestampPlugins = require("../plugins/model/timestamp");

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { versionKey: false }
);
userSchema.plugin(timestampPlugins);

//virtual Fields
userSchema
  .virtual("password")
  .set(function (password) {
    console.log("password=>", password);
    // create temporary variable called _password
    this._password = password;
    // generate a timestapm
    this.salt = uuidv1();
    // encrypt password()
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this.salt;
  });

// Methods
userSchema.methods = {
  authenticate: function (plainText) {
    console.log("Plain Password")
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    console.log("Encript Call=>", password);
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};


// Cart Schema
const cartSchema = new mongoose.Schema(
    {
      user:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
    { versionKey: false }
  );
  cartSchema.plugin(timestampPlugins);

const User = mongoose.model("User", userSchema);
const Cart = mongoose.model("Cart", cartSchema);
module.exports = { User, Cart };
