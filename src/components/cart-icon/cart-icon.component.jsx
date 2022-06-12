import { useDispatch, useSelector } from 'react-redux';
import { setIsOpenCart } from '../../store/cart/cart.action';
import {
  selectCartCount,
  selectIsCartOpen,
} from '../../store/cart/cart.selector';
import { ReactComponent as ShoppingIcon } from './../../assets/shopping-bag.svg';
import { CartIconContainer, ItemCount } from './cart-icon.styles';

function CartIcon(props) {
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const isOpenCart = useSelector(selectIsCartOpen);

  const toggleCartDropDown = () => {
    dispatch(setIsOpenCart(!isOpenCart));
  };

  return (
    <CartIconContainer onClick={toggleCartDropDown}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
