import React from 'react';
import { Product } from '../context/ProductContext';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-gray-600">{product.category}</p>
      <p className="text-gray-800">${product.price.toFixed(2)}</p>
      {product.description && <p className="text-gray-500 mt-2">{product.description}</p>}
    </div>
  );
};

export default ProductCard;
