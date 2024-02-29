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
  const addCartItem = (product, quantity) => {
    const newCartItems = [...cartItems, { product, quantity }];
    setCartItems(newCartItems);
    window.localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const removeCartItem = (productId) => {
    const newCartItems = cartItems.filter((cartItem)=> cartItem.product.id !== productId)
    setCartItems(newCartItems);
    window.localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  }

  return { cartItems, addCartItem, removeCartItem };
};

export default useCart;
