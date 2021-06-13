import { AxiosResponse } from 'axios';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { State } from '../..';
import { api } from '../../../services/api';
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './actions';
import { ActionTypes } from './types';

interface StockResponse {
  id: number;
  quantity: number;
}

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>

export function* checkProductStock(action: CheckProductStockRequest): any {
  const { product } = action.payload;

  const currentQuantity: number = yield select((state: State) => {
    return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0
  });

  const avaiableStockResponse: AxiosResponse<StockResponse> = yield call(api.get, `/stock/${product.id}`);

  if(avaiableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id))
  }
}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
])