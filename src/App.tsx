import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import AddProduct from './pages/AddProduct';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <ProductProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </ProductProvider>
  );
}

export default App;
