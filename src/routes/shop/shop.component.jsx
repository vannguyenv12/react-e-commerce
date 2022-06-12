import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { setCategories } from '../../store/categories/category.action';
import { getCategoriesAndDocument } from '../../utils/firebase/firebase.util';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import './shop.styles.scss';

function Shop(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const categoriesArray = await getCategoriesAndDocument('categories');
      dispatch(setCategories(categoriesArray));
    })();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}

export default Shop;
