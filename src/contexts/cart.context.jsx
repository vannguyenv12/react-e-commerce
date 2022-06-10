import { createContext, useEffect, useState } from 'react';

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

export function CartProvider({ children }) {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
    setCartCount(newCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (acc, curr) => acc + curr.quantity * curr.price,
      0
    );
    setCartTotal(newTotal);
  }, [cartItems]);

  const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product));

  const removeItemToCart = (product) =>
    setCartItems(removeCartItem(cartItems, product));

  const clearCartItem = (cart) => setCartItems(deleteCart(cartItems, cart));

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
