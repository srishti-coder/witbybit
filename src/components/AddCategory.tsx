import React, { useState } from 'react';
import { useProductContext } from '../context/ProductContext';

const AddCategory = () => {
  const { addCategory } = useProductContext();
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category.trim()) {
      addCategory(category.trim());
      setCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="New Category"
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Category
      </button>
    </form>
  );
};

export default AddCategory;
