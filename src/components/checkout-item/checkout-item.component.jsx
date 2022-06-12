import { useDispatch, useSelector } from 'react-redux';
import {
  addItemToCart,
  clearCartItem,
  removeItemToCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import './checkout-item.styles.scss';

function CheckOutItem({ cartItem }) {
  const { name, imageUrl, price, quantity } = cartItem;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const clearCartItemHandler = () =>
    dispatch(clearCartItem(cartItems, cartItem));
  const addItemToCartHandler = () =>
    dispatch(addItemToCart(cartItems, cartItem));
  const removeItemToCartHandler = () =>
    dispatch(removeItemToCart(cartItems, cartItem));

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
