const Product = require('./models');

exports.createProduct = async (req, res) => {
    const product = new Product(req.body)
    console.log("product : ", product)
    await product.save()

    res.status(201).json({
        product
    })
  };

exports.getProducts = async (req, res) => {
    const product = await Product.find()

    res.status(200).json({
        product
    })
};

exports.getOneProduct = async (req, res) => {
    res.status(200).json({
      "message":"Product One Product"
    })
  };

  exports.updateProduct = async (req, res) => {
    res.status(200).json({
      "message":"Product update"
    })
  };

  exports.deleteProduct = async (req, res) => {
    const { productId} = req.params;
    const product = await Product.deleteOne({_id:productId})
    console.log("product : ", product)

    res.status(200).json({
        product
    })
  };
