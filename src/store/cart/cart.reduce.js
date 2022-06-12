import { CART_ACTION_TYPES } from './cart.type';

const CART_INITIAL_STATE = {
  isOpenCart: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isOpenCart: payload,
      };
    default:
      return state;
  }
};
