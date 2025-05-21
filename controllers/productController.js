const Product = require('../model/product');

//business logic

const getProducts = async(req,res)=>{
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
};


const getProduct = async(req,res)=>{
    
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
    
};

const createProduct = async(req,res)=>{
    try{

        const {name,price,description} = req.body;
        const newProduct = new Product({name,price,description});
        await newProduct.save();

        res.status(200).json({message:"Product created successfully"});

    }
    catch(error){
        res.status(500).json({
            success:false,
            message: error.message,
        })
    }
};

const updateProduct = async(req,res)=>{
    const {id} = req.params;
    const {name,price,description} = req.body;
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,{name,price,description},{new:true});
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
};

const deleteProduct =async(req,res)=>{
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
};



module.exports = {getProducts,getProduct,createProduct,updateProduct,deleteProduct}; 