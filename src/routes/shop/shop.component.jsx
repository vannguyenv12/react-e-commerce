import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import './shop.styles.scss';

function Shop(props) {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}

export default Shop;
