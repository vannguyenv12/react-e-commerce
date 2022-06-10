import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.util';

import { ReactComponent as CrownLogo } from './../../assets/crown.svg';
import './navigation.styles.scss';

function Navigation() {
  const { currentUser } = useContext(UserContext);
  const { isOpenCart } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>

          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign in
            </Link>
          )}

          <CartIcon />
        </div>
        {isOpenCart && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
}

export default Navigation;
