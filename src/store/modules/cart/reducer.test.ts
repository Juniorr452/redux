import { cart } from './reducer';
import { ActionTypes, CartState, Product } from './types';

describe("Cart Reducer", () => {
  it('returns the initial state', () => {
    const state: CartState = {
      items: [],
      failedStockCheck: []
    }

    expect(cart(undefined, {type: ''})).toEqual(state)
  });

  it('adds products to the cart on success', () => {
    const product1: Product = {
      id: 1,
      title: 'Test product 1',
      price: 19.99
    };

    const product2: Product = {
      id: 2,
      title: 'Test product 2',
      price: 19.99
    };

    const state: CartState = cart(undefined, 
      { 
        type: ActionTypes.addProductToCartSuccess,
        payload: {
          product: product1
        }
      }
    );

    expect(state).toEqual({
      items: [
        {
          product: product1,
          quantity: 1
        }
      ],
      failedStockCheck: []
    });

    const state2: CartState = cart(state, 
      { 
        type: ActionTypes.addProductToCartSuccess,
        payload: {
          product: product2
        }
      }
    );

    expect(state2).toEqual({
      items: [
        {
          product: product1,
          quantity: 1
        },
        {
          product: product2,
          quantity: 1
        }
      ],
      failedStockCheck: []
    });
  })

  it('increments the quantity if a product already is in the cart', () => {
    const product: Product = {
      id: 1,
      title: 'Test product',
      price: 19.99
    };
    
    const state: CartState = {
      items: [
        {
          product,
          quantity: 1
        }
      ],
      failedStockCheck: []
    }

    const state2: CartState = cart(state, {
      type: ActionTypes.addProductToCartSuccess,
      payload: {
        product
      }
    });

    expect(state2).toEqual({
      items: [
        {
          product,
          quantity: 2
        }
      ],
      failedStockCheck: []
    })
  });

  it('adds the product id to a list on failure', () => {
    const state: CartState = {
      items: [],
      failedStockCheck: [ 1 ]
    }

    expect(cart(undefined, {
      type: ActionTypes.addProductToCartFailure,
      payload: {
        productId: 1
      }
    })).toEqual(state);
  })
})