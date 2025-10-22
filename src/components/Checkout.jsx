
import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useCart } from '../context/CartContext';
import axios from 'axios';


const stripePromise = loadStripe('pk_test_51RJ3FVQeWcfppTDT1KyziandHX4dSXRA1AXhYa8eMKwYUPuPRVorbkxKWlmjOlokKg4TimeVS8KBbmHc6uBx9XeM003oC174Gu'); 

export default function Checkout() {
    const { total, cartItems } = useCart();
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);
    const amountInCents = Math.round(total * 100); 
    useEffect(() => {
        if (cartItems.length === 0 || amountInCents <= 0) return;

        setLoading(true);
        axios.post('/api/checkout/create-payment-intent', { amount: amountInCents })
            .then((res) => {
                setClientSecret(res.data.clientSecret);
            })
            .catch((err) => {
                console.error("Error fetching client secret:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [amountInCents, cartItems.length]);
    
    if (loading) return <div className="text-center mt-20">جاري إعداد الدفع...</div>;
    if (cartItems.length === 0) return <div className="text-center mt-20">لا توجد منتجات للدفع.</div>;

    const options = {
        clientSecret,
        appearance: { theme: 'stripe' },
    };

    return (
        <div className="max-w-xl mx-auto p-5 mt-20">
            <h1 className="text-3xl text-center font-bold mb-6">إتمام الدفع</h1>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm total={total} /> 
                </Elements>
            )}
        </div>
    );
}