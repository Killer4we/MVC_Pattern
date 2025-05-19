const express = require('express');
const Product = require('../model/product');
const router = express.Router();

router.use(express.json());

//view all products
router.get('/products', async(req,res)=>{
    try{

        const prods = await Product.find();
        if(!prods){
            res.send("No products available");
        }
        
        res.status(200).json({
            success:true,
            data:prods,
        })

    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
});


//view a single product

router.get('/product/:id',async(req,res)=>{
    
    const {id} = req.params;
    try{
        const product = await Product.findById(id);
        if(!product){
            res.send("No product found");
        }
        res.status(200).send(product);
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message,
        })
    }
    
});

//create a product

router.post('/product',async(req,res)=>{
    try{

        const {name,price} = req.body;
        const newProduct = new Product({name,price});
        await newProduct.save();

        res.status(200).send("Product created successfully");

    }
    catch(error){
        res.status(500).json({
            success:false,
            message: error.message,
        })
    }
});


//updating a product

router.put('/product/:id',async(req,res)=>{
    const {id} = req.params;
    const {name,price} = req.body;
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,{name,price});
        if(!updatedProduct){
            res.status(200).send("Product not found");
        }
        res.status(200).json({
            success:true,
            message: "Product updated successfully",
            data:updatedProduct,
        })        
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
});



//deleting a product 

router.delete('/product/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct){
            res.send("Product not found");
        }
        res.status(200).send("Product deleted successfully");
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message,
        })
    }
})


module.exports = router;