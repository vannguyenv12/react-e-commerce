import { useReducer } from 'react';
import { createContext, useEffect, useState } from 'react';
import { createAction } from '../utils/reducer/reducer.util';

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const deleteCart = (cartItems, product) => {
  return cartItems.filter((item) => item.id !== product.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearCartItem: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const INITIAL_STATE = {
  isOpenCart: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isOpenCart: payload,
      };
    default:
      throw new Error(`No ${type} in user reducer`);
  }
};

export function CartProvider({ children }) {
  const [{ isOpenCart, cartItems, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCount = newCartItems.reduce((acc, curr) => acc + curr.quantity, 0);
    const newTotal = newCartItems.reduce(
      (acc, curr) => acc + curr.quantity * curr.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCount,
        cartTotal: newTotal,
      })
    );
  };

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const clearCartItem = (cart) => {
    const newCartItems = deleteCart(cartItems, cart);
    updateCartItemsReducer(newCartItems);
  };

  const setIsOpenCart = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    cartItems,
    isOpenCart,
    setIsOpenCart,
    addItemToCart,
    removeItemToCart,
    clearCartItem,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
