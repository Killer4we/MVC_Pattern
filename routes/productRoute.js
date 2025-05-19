const express = require('express');
const router = express.Router();

const {getProducts,getProduct,createProduct,updateProduct,deleteProduct} = require('../controllers/productController');

router.use(express.json());

//view all products
router.get('/products', getProducts);


//view a single product

router.get('/product/:id',getProduct);

//create a product

router.post('/product',createProduct);


//updating a product

router.put('/product/:id',updateProduct);



//deleting a product 

router.delete('/product/:id',deleteProduct);


module.exports = router;