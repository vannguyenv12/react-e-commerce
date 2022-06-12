import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { CartContext } from '../../contexts/cart.context';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutUser } from '../../utils/firebase/firebase.util';

import { ReactComponent as CrownLogo } from './../../assets/crown.svg';
import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from './navigation.styles';

function Navigation() {
  const currentUser = useSelector(selectCurrentUser);
  const isOpenCart = useSelector(selectIsCartOpen);

  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">Shop</NavLink>

          {currentUser ? (
            <NavLink as="span" onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">Sign in</NavLink>
          )}

          <CartIcon />
        </NavLinks>
        {isOpenCart && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
}

export default Navigation;
