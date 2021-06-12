import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { CartState } from '../store/modules/cart/types';

const Cart: React.FC = () => {
  const { items } = useSelector<State, CartState>(state => state.cart);

  return (
    <div>
      <h2>My Cart</h2>

      <table>
        <thead>
          <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.product.id}>
              <td>{item.product.title}</td>
              <td>{item.product.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>{(item.product.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Cart;