import React, { useState } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { useProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const { categories, products, addCategory } = useProductContext();
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
    setShowModal(false);
  };

  
  const categoryMap: { [cat: string]: typeof products } = {};
  categories.forEach(cat => {
    categoryMap[cat] = products.filter(p => p.category === cat);
  });

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="space-x-3">
          <button
            onClick={() => setShowModal(true)}
            className="border border-gray-300 px-4 py-2 rounded"
          >
            Add Category
          </button>
          <Link
            to="/add-product"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </Link>
        </div>
      </div>

      <div className="flex space-x-6">
        {categories.map(cat => (
          <div key={cat} className="w-1/2">
            <h2 className="text-xl font-semibold mb-3">{cat}</h2>
            <div className="space-y-4">
              {categoryMap[cat].map(prod => (
                <div
                  key={prod.id}
                  className="flex items-center space-x-4 border rounded p-4"
                >
                 
                  {prod.image && (
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-16 h-16 object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-medium text-lg">{prod.name}</h3>
                    <p className="text-gray-500">₹{prod.price}</p>
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 text-sm rounded">
                      {prod.brand}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-semibold mb-4">Add category</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Category name *</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowModal(false)}
            className="border border-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default ProductsPage;
