
import React, { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

      if (newQuantity > product.stock) {
        toast.error(`عفواً، الكمية المطلوبة (${newQuantity}) تتجاوز المخزون المتوفر (${product.stock}).`);
        return prevItems;
      }

      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id ? { ...item, quantity: newQuantity } : item);
      } else {
        toast.success(`تمت إضافة ${product.name} إلى السلة!`, {
            icon: '🛒',
            duration: 1500,
        });

        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems => {
      const itemToUpdate = prevItems.find(item => item._id === productId);

      if (!itemToUpdate) return prevItems;

      if (newQuantity > itemToUpdate.stock) {
         toast.error(`الحد الأقصى المسموح به هو ${itemToUpdate.stock}.`);
         return prevItems; 
      }
      
      if (newQuantity <= 0) {
        toast(`تمت إزالة ${itemToUpdate.name} من السلة.`, {
             icon: '🗑️' 
        });
        return prevItems.filter(item => item._id !== productId);
      } 
      
      return prevItems.map(item =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast('تم إفراغ السلة بالكامل.', {
         icon: '👋' 
    });
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  ).toFixed(2);

  const contextValue = {
    cartItems,
    addToCart,
    updateQuantity,
    clearCart,
    total,
    cartCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};