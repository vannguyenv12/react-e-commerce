import React from 'react';
import { Link } from 'react-router-dom';
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directory-item.styles';

function DirectoryItem({ category }) {
  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={category.imageUrl}></BackgroundImage>

      <Body>
        <Link to={`/shop/${category.title}`}>
          <h2>{category.title}</h2>
          <p>Shop now</p>
        </Link>
      </Body>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;
