const express = require('express');

const { 
    // userById,
    createProduct,
    getProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
} = require('./views');
const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:productId', getOneProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);


// any route containing :userId our app will first execute userById
// router.param("userId", userById)

module.exports = router;