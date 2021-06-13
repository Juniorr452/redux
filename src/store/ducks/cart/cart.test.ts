import { cart, Types, Creators } from './';
import { CartState, Product } from './types';
import { checkProductStock } from './sagas';
import sagaTestingHelper from "redux-saga-testing";

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
        type: Types.ADD_PRODUCT_TO_CART_SUCCESS,
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
        type: Types.ADD_PRODUCT_TO_CART_SUCCESS,
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
      type: Types.ADD_PRODUCT_TO_CART_SUCCESS,
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
      type: Types.ADD_PRODUCT_TO_CART_FAILURE,
      payload: {
        productId: 1
      }
    })).toEqual(state);
  })
})

describe('Cart Sagas', () => {
  describe('Check Product Stock', () => {
    const product: Product = {
      id: 1,
      title: 'Test product',
      price: 19.99
    }

    describe('Scenario 1: desired quantity is available in stock', () => {
      const it = sagaTestingHelper(checkProductStock({
        type: Types.ADD_PRODUCT_TO_CART_REQUEST,
        payload: {
          product
        }
      }))

      it('gets the current quantity in cart', (result: any) => {        
        expect(result.type).toBe('SELECT')

        return 2;
      })

      it('gets the available stock from the api', (result: any) => {
        expect(result.payload.args[0]).toBe(`/stock/${product.id}`);

        return {
          data: {
            quantity: 4
          }
        }
      })

      it('calls add product success', (result: any) => {
        expect(result.payload.action).toEqual(Creators.addProductToCartSuccess(product))
      })
    })

    describe('Scenario 2: desired quantity is not available in stock', () => {
      const it = sagaTestingHelper(checkProductStock({
        type: Types.ADD_PRODUCT_TO_CART_REQUEST,
        payload: {
          product
        }
      }))

      it('gets the current quantity in cart', (result: any) => {
        return 2;
      })
      
      it('gets the available stock from the api', (result: any) => {
        return {
          data: {
            quantity: 2
          }
        }
      })

      it('calls add product success', (result: any) => {
        expect(result.payload.action).toEqual(Creators.addProductToCartFailure(product.id))
      })
    })
  })
})