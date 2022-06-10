import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

function CheckOutItem({ cartItem }) {
  const { name, imageUrl, price, quantity } = cartItem;
  const { clearCartItem, addItemToCart, removeItemToCart } =
    useContext(CartContext);

  const clearCartItemHandler = () => clearCartItem(cartItem);
  const addItemToCartHandler = () => addItemToCart(cartItem);
  const removeItemToCartHandler = () => removeItemToCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemToCartHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemToCartHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={clearCartItemHandler}>
        &#10005;
      </span>
    </div>
  );
}

export default CheckOutItem;
