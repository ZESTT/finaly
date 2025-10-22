import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'; 
import { useCart } from '../context/CartContext'; 


export default function Home() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart(); 

    async function getProducts() {
        try {
            let response = await axios.get(`http://localhost:5000/api/products`); 
            setProducts(response.data); 
        } catch (error) {
            console.error("Error fetching products:", error.message);
        }
    }

    useEffect(() => {
        getProducts()
    }, [])
    
    const handleAddToCart = (product) => {
        if (product && product.stock > 0) {
            addToCart(product);
        }
    };


    return (
        <div className='row flex flex-wrap justify-center'>
            {products.map((product) => (
                <div key={product._id} className='w-full sm:w-1/2 md:w-1/4 lg:w-1/4 p-3'>
                    
                    <div className='product border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300'>
                        
                        <Link to={`/product/${product._id}`} className='block'>
                            <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className='w-full h-48 object-cover' 
                            />
                        </Link>
                        
                        <div className='p-3'>
                            <Link to={`/product/${product._id}`}>
                                <h2 className='text-lg font-semibold truncate hover:text-blue-600 transition'>{product.name}</h2>
                            </Link>
                            <p className='text-sm text-gray-600 truncate'>{product.description}</p>
                            <h2 className='text-xl font-bold text-blue-600 mt-1'> {product.price} EGP</h2>
                            
                            <button 
                                onClick={() => handleAddToCart(product)}
                                disabled={product.stock === 0}
                                className={`mt-2 w-full py-2 rounded-lg text-white font-medium ${
                                    product.stock > 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {product.stock > 0 ? 'أضف إلى السلة' : 'نفذت الكمية'}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}