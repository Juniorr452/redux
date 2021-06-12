import React from 'react';
import { Product } from '../store/modules/cart/types';
import { addProductToCartRequest } from '../store/modules/cart/actions';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../store';

interface CatalogItemProps {
  product: Product;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const hasFailedStockCheck = useSelector<State, boolean>(state => state.cart.failedStockCheck.includes(product.id));

  function handleBuy() {
    dispatch(addProductToCartRequest(product));
  }
  
  return (
    <article key={product.id}>
    <strong>{product.title}</strong> {" - "}
    <span>{product.price}</span> {"   "}

    <button type="button" onClick={handleBuy}>Buy</button>

    {hasFailedStockCheck && <span style={{color: 'red'}}>Not in stock</span>}
  </article>
  )
}

export default CatalogItem;