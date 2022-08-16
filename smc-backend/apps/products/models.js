const mongoose = require("mongoose");
const timestampPlugins = require("../plugins/model/timestamp")

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String
  },
  brandName: {
    type: String,
  },
  category: {
    type: String,
  },
  mrp: {
    type: String,
  },
  price: {
    type: String,
  },
},
{versionKey: false}
);

productSchema.plugin(timestampPlugins)

module.exports = mongoose.model("Product", productSchema);

