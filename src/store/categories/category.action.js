import { createAction } from './../../utils/reducer/reducer.util';
import { CATEGORIES_ACTION_TYPES } from './category.type';

export const setCategories = (categoriesArray) => {
  return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
};
