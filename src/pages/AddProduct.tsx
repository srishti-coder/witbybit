import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';


type VariantOption = {
  name: string;
  values: string[];
};


type Combination = {
  name: string;
  sku: string;
  inStock: boolean;
  quantity: number;
  error?: string;
};


type FormData = {
  productName: string;
  category: string;
  brand?: string;
  image?: FileList;

  price: number;
  discountMethod: 'pct' | 'flat';
  discountValue: number;
};

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [variants, setVariants] = useState<VariantOption[]>([
    { name: 'Size', values: ['M', 'L'] },
    { name: 'Color', values: ['Black', 'Red'] },
  ]);


  const [combinations, setCombinations] = useState<Combination[]>([
    { name: 'M/Black', sku: 'ABC12', inStock: true, quantity: 5, error: '' },
    { name: 'M/Red',   sku: 'SOF23', inStock: false, quantity: 0, error: '' },
    { name: 'L/Black', sku: 'WHE2',  inStock: true, quantity: 10, error: '' },
    { name: 'L/Red',   sku: 'ABC12', inStock: true, quantity: 2,  error: 'Duplicate SKU' },
  ]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      productName: '',
      category: 'Shoes',
      brand: 'Nike',
      price: 0,
      discountMethod: 'pct',    
      discountValue: 0,
    },
  });

  const selectedCategory = watch('category');
  const discountMethod = watch('discountMethod'); 


  const handleVariantNameChange = (variantIndex: number, newName: string) => {
    setVariants((prev) => {
      const updated = [...prev];
      updated[variantIndex] = { ...updated[variantIndex], name: newName };
      return updated;
    });
  };

  const handleVariantValuesChange = (variantIndex: number, newValues: string) => {
    setVariants((prev) => {
      const updated = [...prev];
      updated[variantIndex] = {
        ...updated[variantIndex],
        values: newValues.split(',').map((v) => v.trim()).filter(Boolean),
      };
      return updated;
    });
  };

  const handleRemoveValue = (variantIndex: number, valueIndex: number) => {
    setVariants((prev) => {
      const updated = [...prev];
      const newVals = [...updated[variantIndex].values];
      newVals.splice(valueIndex, 1);
      updated[variantIndex] = { ...updated[variantIndex], values: newVals };
      return updated;
    });
  };

  const handleRemoveOption = (index: number) => {
    setVariants((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleAddOption = () => {
    setVariants((prev) => [...prev, { name: '', values: [] }]);
  };


  const handleSKUChange = (index: number, newSKU: string) => {
    setCombinations((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], sku: newSKU };
      updated[index].error = checkDuplicateSKU(updated, newSKU, index);
      return updated;
    });
  };

  const handleInStockChange = (index: number, checked: boolean) => {
    setCombinations((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], inStock: checked };
      return updated;
    });
  };

  const handleQuantityChange = (index: number, newQty: number) => {
    setCombinations((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity: newQty };
      return updated;
    });
  };

  const checkDuplicateSKU = (
    arr: Combination[],
    sku: string,
    currentIndex: number
  ) => {
    const found = arr.find((c, i) => i !== currentIndex && c.sku === sku);
    return found ? 'Duplicate SKU' : '';
  };


  const onSubmit: SubmitHandler<FormData> = (data) => {
    const finalData = {
      ...data,
      variants,
      combinations,
    };
    console.log('Final submission:', finalData);
   
    navigate('/home');
  };

  const handleNext = async () => {
    let valid = false;
    if (step === 1) {
      valid = await trigger(['productName', 'category']);
    } else if (step === 2) {
      valid = true;
    } else if (step === 3) {
      valid = true;
    }
    if (valid || step > 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => setStep(step - 1);
  const handleCancel = () => navigate('/products');

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
            Cancel
          </button>
          {step < 4 && (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          )}
          {step === 4 && (
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <div
            className={`cursor-pointer pb-2 ${
              step === 1 ? 'border-b-2 border-blue-500 font-bold' : 'text-gray-500'
            }`}
            onClick={() => setStep(1)}
          >
            Description
          </div>
          <div
            className={`cursor-pointer pb-2 ${
              step === 2 ? 'border-b-2 border-blue-500 font-bold' : 'text-gray-500'
            }`}
            onClick={() => setStep(2)}
          >
            Variants
          </div>
          <div
            className={`cursor-pointer pb-2 ${
              step === 3 ? 'border-b-2 border-blue-500 font-bold' : 'text-gray-500'
            }`}
            onClick={() => setStep(3)}
          >
            Combinations
          </div>
          <div
            className={`cursor-pointer pb-2 ${
              step === 4 ? 'border-b-2 border-blue-500 font-bold' : 'text-gray-500'
            }`}
            onClick={() => setStep(4)}
          >
            Price info
          </div>
        </div>

        {/* Step 1: Description */}
        {step === 1 && (
          <div className="bg-white p-6 rounded shadow-sm">
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Product Name *</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                {...register('productName', { required: 'Product name is required' })}
              />
              {errors.productName && (
                <p className="text-red-500 text-sm">{errors.productName.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Category *</label>
              <select
                className="w-full border p-2 rounded"
                {...register('category', { required: 'Category is required' })}
              >
                <option value="Shoes">Shoes</option>
                <option value="Clothes">Clothes</option>
                <option value="Mobile">Mobile</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category.message}</p>
              )}
            </div>
            {selectedCategory === 'Shoes' ? (
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Brand</label>
                <select className="w-full border p-2 rounded" {...register('brand')}>
                  <option value="Nike">Nike</option>
                  <option value="Adidas">Adidas</option>
                </select>
              </div>
            ) : (
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Brand</label>
                <input
                  type="text"
                  placeholder="e.g. Levi's or Samsung"
                  className="w-full border p-2 rounded"
                  {...register('brand')}
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Upload Image</label>
              <input type="file" {...register('image')} />
            </div>
          </div>
        )}

        {/* Step 2: Variants */}
        {step === 2 && (
          <div className="bg-white p-6 rounded shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Variants</h2>
            <p className="text-sm text-gray-600 mb-4">
              Define each variant option (e.g. "Size", "Color") and its values.
            </p>
            {variants.map((variant, variantIndex) => {
              const isEmpty = !variant.name || variant.values.length === 0;
              return (
                <div key={variantIndex} className="mb-4 border-b pb-4">
                  <div className="flex items-start space-x-4">
                    {/* Option */}
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">Option</label>
                      <input
                        type="text"
                        placeholder="e.g. Size"
                        className="border p-2 rounded w-full"
                        value={variant.name}
                        onChange={(e) => handleVariantNameChange(variantIndex, e.target.value)}
                      />
                    </div>
                    {/* Values */}
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">Values</label>
                      <input
                        type="text"
                        placeholder="e.g. M, L, XL"
                        className="border p-2 rounded w-full"
                        value={variant.values.join(', ')}
                        onChange={(e) => handleVariantValuesChange(variantIndex, e.target.value)}
                      />
                      <div className="mt-2 flex flex-wrap gap-2">
                        {variant.values.map((val, valIndex) => (
                          <div
                            key={valIndex}
                            className="bg-gray-200 px-2 py-1 rounded flex items-center"
                          >
                            <span>{val}</span>
                            <button
                              type="button"
                              className="ml-2 text-red-500"
                              onClick={() => handleRemoveValue(variantIndex, valIndex)}
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Remove Entire Option */}
                    <button
                      type="button"
                      className="text-red-500 mt-5"
                      onClick={() => handleRemoveOption(variantIndex)}
                    >
                      &times;
                    </button>
                  </div>
                  {isEmpty && (
                    <p className="text-red-500 text-sm mt-2">Options can’t be empty</p>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              onClick={handleAddOption}
              className="text-blue-500 hover:underline"
            >
              + Add Option
            </button>
          </div>
        )}

        {/* Step 3: Combinations */}
        {step === 3 && (
          <div className="bg-white p-6 rounded shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Combinations</h2>
            <p className="text-sm text-gray-600 mb-4">
              Manage SKU, in-stock status, and quantity for each combination.
            </p>
            <div className="space-y-2">
              {combinations.map((combo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded"
                >
                  <span className="w-24 font-medium text-gray-700">{combo.name}</span>
                  <input
                    type="text"
                    className="border p-2 rounded w-28"
                    value={combo.sku}
                    onChange={(e) => handleSKUChange(index, e.target.value)}
                  />
                  <label className="inline-flex items-center space-x-2">
                    <span className="text-sm text-gray-700">In stock</span>
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={combo.inStock}
                      onChange={(e) => handleInStockChange(index, e.target.checked)}
                    />
                  </label>
                  <input
                    type="number"
                    className="border p-2 rounded w-16"
                    value={combo.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value) || 0)
                    }
                  />
                  {combo.error && (
                    <span className="text-red-500 text-sm ml-2">{combo.error}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white p-6 rounded shadow-sm w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Price Info</h2>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Price *</label>
              <div className="flex items-center border rounded px-3 py-2">
                <span className="text-gray-600 mr-2">₹</span>
                <input
                  type="number"
                  step="0.01"
                  className="flex-1 outline-none"
                  {...register('price', { required: 'Price is required', valueAsNumber: true })}
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Discount</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="0.01"
                  className="border rounded px-3 py-2 flex-1"
                  {...register('discountValue', { valueAsNumber: true })}
                />
               
                <button
                  type="button"
                  className={`px-3 py-2 rounded border ${
                    discountMethod === 'pct'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-gray-100 text-gray-700 border-gray-300'
                  }`}
                  onClick={() => {
                    setValue('discountMethod', 'pct');
                  }}
                >
                  %
                </button>
                {/* Toggle for $ */}
                <button
                  type="button"
                  className={`px-3 py-2 rounded border ${
                    discountMethod === 'flat'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-gray-100 text-gray-700 border-gray-300'
                  }`}
                  onClick={() => {
                    setValue('discountMethod', 'flat');
                  }}
                >
                  $
                </button>
              </div>
            </div>
          </div>
        )}

        {step > 1 && (
          <div className="mt-6">
            <button
              onClick={handleBack}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddProduct;

