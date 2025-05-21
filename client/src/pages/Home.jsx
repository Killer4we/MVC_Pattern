import {react,useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {WhatsappIcon} from 'react-share';
import {toast} from 'react-hot-toast';
import './Home.css';

const Home = () =>{
    const [products,setProducts] = useState([]);
    const [loading,isLoading] = useState(false);

    const fetchProducts = async () =>{
        isLoading(true);
        try{
          const response = await fetch('/api/products');
          if(!response.ok){
            throw new Error('Failed to fetch the products');
        }
        const data = await response.json();
        // console.log(data);
        setProducts(data.data);
        // console.log(products);
        }catch(error){
            console.error(error.message);
        }
        isLoading(false);
    }

   const handleDelete = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete this paste?");
  if (!confirm) return;

  try {
    const response = await fetch(`/api/product/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete the paste');
    }

    toast.success("Deleted successfully");

    // Optional: Refresh the list of pastes after deletion
    // either re-fetch or remove from state
    setProducts((prev) => prev.filter((product) => product._id !== id));
  } catch (error) {
    console.error(error.message);
    toast.error("Failed to delete");
  }
};

    
    const baseUrl = window.location.origin;
    return (
        <div>
            <button onClick = {fetchProducts} disabled = {loading}>{loading? 'Loading' : 'Show all Products'}</button>
            {
              products.length > 0 && products.map((product)=>{
                const shareUrl  = `${baseUrl}/product/${product._id}`;
                return (
                  <div key={product._id}>
                    <div className="product-card" key={product._id}>
                    <div className="product-title">Title: {product.name}</div>
                    <div className='product-price'>Price: {product.price}</div>
                    <div className="product-content">Content: {product.description}</div>
                    <div className="button-group">
                    <Link className="view-button" to={`/product/${product._id}`}><button>View</button></Link>
                    <Link className="copy-button">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(product.description);
                        toast.success("Copied Successfully");
                      }}
                    >Copy</button>
                    </Link>
                    <Link className="delete-button">
                      <button onClick={() => handleDelete(product._id)}>Delete</button>
                    </Link>
                <button
                  className="whatsapp-share-button"
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    toast.success("Link copied successfully");
                  }}
                >
                <WhatsappIcon size={24} round />
                </button>
            </div>
              <div className="created-at">
                {new Date(product.createdAt).toLocaleString()}
              </div>
            </div>
                </div>
                )
              })
            }
            <br/><br/>
            <button onClick={()=>{
              setProducts([]);
            }}>Reset</button>
            <br/><br/>
        </div>
        )}
export default Home;