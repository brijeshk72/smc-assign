const { Cart } = require("./models");

exports.addCart = async (req, res) => {
  console.log("Cart call");
  req.body.user = req.auth._id;
  const cart = new Cart(req.body);
  await cart.save();
  res.status(200).send(cart);
};

exports.updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ productId });
  cart.quantity = quantity;
  await cart.save();
  res.status(200).send(cart);
};

exports.getUserCart = async (req, res) => {
  const user = req.auth._id;
  const cart = await Cart.find({ user }).populate("productId");
  res.status(200).send(cart);
};
