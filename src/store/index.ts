import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { CartState } from "./modules/cart/types";

import createSagaMiddleware from 'redux-saga';
import rootSaga from "./modules/rootSaga";
import rootReducer from "./ducks";

export interface State {
  cart: CartState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware
];

export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(...middlewares)
));

sagaMiddleware.run(rootSaga);