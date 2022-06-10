import React, { createContext, useEffect, useState } from 'react';
import {
  createUserDocFromAuth,
  onAuthStateChangedListner,
  signOutUser,
} from '../utils/firebase/firebase.util';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubcribe = onAuthStateChangedListner((user) => {
      console.log(user);
      if (user) {
        createUserDocFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubcribe;
  }, []);

  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
