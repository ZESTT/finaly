
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import { useCart } from '../context/CartContext'; 

export default function ProductDetails() {
    const { id } = useParams();  
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart(); 
    

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`); 
                const { product } = res.data; 
                setProduct(product);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };
        
        if (id) {
            fetchProduct();
        }
    }, [id]); 

    const handleAddToCart = () => {
        if (product && product.stock > 0) {
            addToCart(product);
        }
    };
  

    if (!product) {
        return <div className="text-center mt-8 text-red-500"> لم يتم العثور على المنتج.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-5 shadow-lg rounded-lg mt-8 bg-white">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                    <img 
                        src={product.imageUrl}
                        alt={product.name} 
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
                <div className="md:w-1/2">
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-2xl font-semibold text-blue-600 mb-4">السعر: EGP{product.price}</p>
                    <p className={`text-lg font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `متوفر: ${product.stock}` : 'نفذت الكمية'}
                    </p>
                    
                    <button 
                        onClick={handleAddToCart} 
                        className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
                        disabled={product.stock === 0}
                    >
                        أضف إلى السلة
                    </button>
                   
                </div>
            </div>
        </div>
    );
}