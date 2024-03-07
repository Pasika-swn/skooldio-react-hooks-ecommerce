import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  //Load cartitems from localstorage (old items)
  //cartItems is a key
  useEffect(() => {
    const cartItemsString = window.localStorage.getItem('cartItems'); //output => string
    const cart = cartItemsString ? JSON.parse(cartItemsString) : []; //covert from JSON obj to JS obj
    setCartItems(cart);
  }, []);

  //add newitem to a cart
  //   const addCartItem = (product, quantity) => {
  //     const newCartItems = [...cartItems, { product, quantity }];
  //     setCartItems(newCartItems);
  //     window.localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  //   };

  const addCartItem = (product, quantity) => {
    quantity = parseInt(quantity)
    const matchingCartItem = cartItems.find((cartItem) => cartItem.product.id === product.id);

    if (matchingCartItem) {
      matchingCartItem.quantity += quantity;
    } else {
      cartItems.push({ product, quantity });
    }

    setCartItems([...cartItems]); // Update state with a new array reference
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const removeCartItem = (productId) => {
    const newCartItems = cartItems.filter((cartItem) => cartItem.product.id !== productId);
    setCartItems(newCartItems);
    window.localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const updateQuantity = (productId, quantity) => {
    const matchingCartItem = cartItems.find((cartItem) => cartItem.product.id === productId);

    if (!matchingCartItem) {
      return
    } 
    matchingCartItem.quantity = quantity

    setCartItems([...cartItems]); // Update state with a new array reference
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  return { cartItems, addCartItem, removeCartItem, updateQuantity };
};

export default useCart;
