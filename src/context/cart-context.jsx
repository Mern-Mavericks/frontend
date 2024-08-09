import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      return JSON.parse(savedCart);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addProduct = (product, quantity) => {
    console.log('Product being added:', product);
    setCart((prevCart) => {
      prevCart.forEach((item) => {
        console.log('Item in cart:', item);
      });

      const existingProductIndex = prevCart.findIndex(
        (item) => item.product._id === product._id,
      );

      if (existingProductIndex !== -1) {
        const updatedCart = prevCart.map((item, index) => {
          if (index === existingProductIndex) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });

        return updatedCart;
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const removeProduct = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product._id !== productId),
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.product._id === productId) {
          return { ...item, quantity: newQuantity };
        } else {
          return item;
        }
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
