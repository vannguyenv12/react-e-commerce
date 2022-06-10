import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as ShoppingIcon } from './../../assets/shopping-bag.svg';
import { CartIconContainer, ItemCount } from './cart-icon.styles';

function CartIcon(props) {
  const { isOpenCart, setIsOpenCart, cartCount } = useContext(CartContext);

  const toggleCartDropDown = () => {
    setIsOpenCart(!isOpenCart);
  };

  return (
    <CartIconContainer onClick={toggleCartDropDown}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
