import produce from 'immer';
import { CartState } from "./types";
import { createActions, createReducer } from "reduxsauce";
import { AnyAction } from 'redux';

const INITIAL_STATE: CartState = {
  items: [],
  failedStockCheck: []
}

export const { Types, Creators } = createActions({
  addProductToCartRequest: ['product'],
  addProductToCartSuccess: ['product'],
  addProductToCartFailure: ['productId'],
})

const addSuccess = (state = INITIAL_STATE, action: AnyAction) => {
  return produce(state, draft => {
    const { product } = action.payload;
  
    const productInCartIndex = draft.items.findIndex(item => (
      item.product.id === product.id
    ));
  
    if(productInCartIndex >= 0) {
      draft.items[productInCartIndex].quantity++;
    } else {
      draft.items.push({
        product,
        quantity: 1
      })
    }
  })
}

const addFailure = (state = INITIAL_STATE, action: AnyAction) => {
  return produce(state, draft => {
    draft.failedStockCheck.push(action.payload.productId);
  })
}

export const cart = createReducer(INITIAL_STATE, {
  [Types.ADD_PRODUCT_TO_CART_SUCCESS]: addSuccess,
  [Types.ADD_PRODUCT_TO_CART_FAILURE]: addFailure 
})