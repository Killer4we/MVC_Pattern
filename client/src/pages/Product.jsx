import {react, useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';

const Product = ()=>{
    const {id} = useParams();
    const [product,setProduct] = useState(null);
    const [loading,setLoading] = useState(true);


    useEffect(()=>{
        const fetchProduct = async()=>{
            try{

                const response = await fetch(`/api/product/${id}`);
                if(!response.ok){
                    throw new Error('Failed to fetch the product');
                }

                const data = await response.json();
                setProduct(data);
                setLoading(false);
                

            }catch(error){
                console.error(error.message);
            }
        } 
        fetchProduct();
    },[id]);
    
    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;
    
return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Created at:</strong> {new Date(product.createdAt).toLocaleString()}</p>
      <button> <Link to = '/'>Go back</Link></button>
    </div>
    
)
}

export default Product;