import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Product } from '../store/modules/cart/types';
import CatalogItem from './CatalogItem';

const Catalog: React.FC = () => {
  const [catalog, setCatalog] = useState<Product[]>([]);

  useEffect(() => {
    async function loadCatalog() {
      const response = await api.get('/products');

      setCatalog(response.data);
    }

    loadCatalog();
  }, []);

  return (
    <div>
      <h2>Catalog</h2>

      {catalog.map(product => <CatalogItem key={product.id} product={product}/>)}
    </div>
  )
}

export default Catalog;