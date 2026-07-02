import React, { useState } from "react";
import useProduct from "../hooks/useProduct";
import { useNavigate } from "react-router";

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    gender: "Male",
    category: "",
    priceAmount: "",
    priceCurrency: "AUD",
    description: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      images.forEach((image) => {
        data.append("images", image);
      });

      const result = await handleCreateProduct(data);
      if(result.success){
        navigate("/");
      }
      setFormData({
        name: "",
        brand: "",
        gender: "Male",
        category: "",
        priceAmount: "",
        priceCurrency: "AUD",
        description: "",
      });

      setImages([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border rounded p-2"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          className="w-full border rounded p-2"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
        />

        <select
          className="w-full border rounded p-2"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          className="w-full border rounded p-2"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          className="w-full border rounded p-2"
          type="number"
          name="priceAmount"
          placeholder="Price"
          value={formData.priceAmount}
          onChange={handleChange}
        />

        <select
          className="w-full border rounded p-2"
          name="priceCurrency"
          value={formData.priceCurrency}
          onChange={handleChange}
        >
          <option value="AUD">AUD</option>
          <option value="USD">USD</option>
        </select>

        <textarea
          className="w-full border rounded p-2"
          rows="4"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          className="w-full"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          type="submit"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;