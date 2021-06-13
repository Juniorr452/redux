import { ActionTypes, Product } from "./types"
import { checkProductStock } from './sagas';
import sagaTestingHelper from "redux-saga-testing";
import { addProductToCartSuccess, addProductToCartFailure } from "./actions";

describe('Cart Sagas', () => {
  describe('Check Product Stock', () => {
    const product: Product = {
      id: 1,
      title: 'Test product',
      price: 19.99
    }

    describe('Scenario 1: desired quantity is available in stock', () => {
      const it = sagaTestingHelper(checkProductStock({
        type: ActionTypes.addProductToCartRequest,
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
        expect(result.payload.action).toEqual(addProductToCartSuccess(product))
      })
    })

    describe('Scenario 2: desired quantity is not available in stock', () => {
      const it = sagaTestingHelper(checkProductStock({
        type: ActionTypes.addProductToCartRequest,
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
        expect(result.payload.action).toEqual(addProductToCartFailure(product.id))
      })
    })
  })
})