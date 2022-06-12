import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategories } from '../../store/categories/category.selector';

import './category.styles.scss';

function Category(props) {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategories);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <div className="category-title">{category.toUpperCase()}</div>
      <div className="category-container">
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
    </>
  );
}

export default Category;
