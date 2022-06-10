import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import {
  CartDropdownContainer,
  cartItems,
  EmptyMessage,
} from './cart-dropdown.styles';

function CartDropdown(props) {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const goToCheckOutHandler = () => {
    navigate('/checkout');
  };

  return (
    <CartDropdownContainer>
      <cartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </cartItems>
      <Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
}

export default CartDropdown;
