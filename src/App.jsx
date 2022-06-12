import { Route, Routes } from 'react-router-dom';
import './categories.styles.scss';
import Authentication from './routes/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';

import { useEffect } from 'react';
import {
  createUserDocFromAuth,
  onAuthStateChangedListner,
} from './utils/firebase/firebase.util';
import { setCurrentUser } from './store/user/user.action';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubcribe = onAuthStateChangedListner((user) => {
      if (user) {
        console.log(user);
        createUserDocFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubcribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
