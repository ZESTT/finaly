
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md'; 

export default function CartSummary() {
    const { cartItems, total, updateQuantity, clearCart } = useCart();
    if (cartItems.length === 0) {
        return <div className="text-center mt-12">
            <h2 className="text-2xl font-semibold">عربة التسوق فارغة حالياً.</h2>
            <Link to="/" className="text-blue-500 hover:underline">ابدأ التسوق!</Link>
        </div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-5 mt-20">

            <h1 className="text-3xl font-bold mb-6"> عربة التسوق</h1>
            
            <div className="shadow-lg rounded-lg overflow-hidden bg-white">
                {cartItems.map(item => (
                    <div key={item._id} className="flex items-center p-4 border-b last:border-b-0">
                        <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-20 h-20 object-cover rounded-md" 
                        />
                        
                        <div className="flex-grow mx-4">
                            <h4 className="font-semibold text-lg">{item.name}</h4>
                            <p className="text-gray-500">سعر القطعة: {item.price} EGP</p>
                            <p className="text-sm text-red-500">المخزون المتوفر: {item.stock}</p>
                        </div>
                        
                        <div className="flex items-center border rounded-lg p-1 mr-4">
                            
                            <button 
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                disabled={item.quantity <= 1} 
                                className="px-2 py-1 text-xl font-bold text-gray-700 disabled:opacity-50"
                            >
                                -
                            </button>
                            
                            <span className="w-8 text-center font-bold">
                                {item.quantity}
                            </span>
                            
                            <button 
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                disabled={item.quantity >= item.stock} 
                                className="px-2 py-1 text-xl font-bold text-gray-700 disabled:opacity-50"
                            >
                                +
                            </button>
                        </div>
                        
                        <div className='flex flex-col items-end'>
                            <p className="font-bold text-lg mb-1">${(item.price * item.quantity).toFixed(2)} EGP</p>
                            <button 
                                onClick={() => updateQuantity(item._id, 0)}
                                className="text-red-500 hover:text-red-700 flex items-center text-sm"
                            >
                                <MdDeleteForever className='w-5 h-5 mr-1'/> 
                                إزالة بالكامل
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            <div className="mt-8 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                <h2 className="text-2xl font-bold">EGP  الإجمالي الكلي:{total}  </h2>
                
                <div className='flex gap-4'>
                    <button 
                        onClick={clearCart} 
                        className="py-3 px-6 rounded-lg font-semibold border border-red-500 text-red-500 hover:bg-red-50"
                    >
                        تراجع 
                    </button>
                    
                    <Link to="/checkout" 
                        className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 font-semibold transition"
                    >
                        المتابعة إلى الدفع (Checkout)
                    </Link>
                </div>
            </div>

        </div> 
    );
}