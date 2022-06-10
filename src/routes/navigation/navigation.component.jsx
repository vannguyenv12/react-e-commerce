import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.util';

import { ReactComponent as CrownLogo } from './../../assets/crown.svg';
import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from './navigation.styles';

function Navigation() {
  const { currentUser } = useContext(UserContext);
  const { isOpenCart } = useContext(CartContext);

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
