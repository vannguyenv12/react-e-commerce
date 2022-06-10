import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as ShoppingIcon } from './../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

function CartIcon(props) {
  const { isOpenCart, setIsOpenCart, cartCount } = useContext(CartContext);

  const toggleCartDropDown = () => {
    setIsOpenCart(!isOpenCart);
  };

  return (
    <div className="cart-icon-container" onClick={toggleCartDropDown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
}

export default CartIcon;
