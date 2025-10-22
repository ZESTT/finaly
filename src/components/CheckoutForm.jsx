
import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function CheckoutForm({ total }) {
    const stripe = useStripe();
    const elements = useElements();
    const { clearCart } = useCart();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success`, 
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            toast.error(error.message);
        } else {
            toast.error("حدث خطأ غير متوقع.");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4"> EGP المبلغ المستحق: {total} </h2>
            
            <PaymentElement id="payment-element" />
            <button 
                disabled={isLoading || !stripe || !elements} 
                className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-semibold"
            >
                {isLoading ? "جاري المعالجة..." : "ادفع الآن"}
            </button>
            
        </form>
    );
}