import './directory-item.styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';

function DirectoryItem({ category }) {
  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${category.imageUrl})`,
        }}
      ></div>

      <Link to={`/shop/${category.title}`} className="body">
        <h2>{category.title}</h2>
        <p>Shop now</p>
      </Link>
    </div>
  );
}

export default DirectoryItem;
