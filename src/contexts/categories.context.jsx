import React, { createContext, useEffect, useState } from 'react';
import { getCategoriesAndDocument } from '../utils/firebase/firebase.util.js';

import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export function CategoriesProvider({ children }) {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };

  useEffect(() => {
    (async () => {
      const categoryMap = await getCategoriesAndDocument();
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    })();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
