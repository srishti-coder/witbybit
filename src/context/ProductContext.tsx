import React, { createContext, useContext, useState, ReactNode } from 'react';

import nike from '../assets/nike.png';


export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  brand?: string;
  image?: string;
  description?: string;
};

type ProductContextType = {
  categories: string[];
  products: Product[];
  addCategory: (cat: string) => void;
  addProduct: (p: Product) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<string[]>(['Shoes', 'T-shirt']);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Nike Air Jordan',
      category: 'Shoes',
      price: 12000,
      brand: 'Nike',
      image: nike,
      description: 'A popular high performance sneaker'
    },
    {
      id: 2,
      name: 'Nike Dunk Low',
      category: 'Shoes',
      price: 8000,
      brand: 'Nike',
      image: nike,
      description: 'Casual and trendy sneaker'
    }
  ]);

  const addCategory = (cat: string) => {
    if (!categories.includes(cat)) {
      setCategories(prev => [...prev, cat]);
    }
  };

  const addProduct = (p: Product) => {
    setProducts(prev => [...prev, p]);
  };

  return (
    <ProductContext.Provider value={{ categories, products, addCategory, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
