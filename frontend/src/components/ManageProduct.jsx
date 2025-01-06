import React, { useState, useEffect, useImperativeHandle } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faHouseChimneyUser,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { createProduct } from "../api/product";
import { categories } from "../api/category";
import { useParams } from "react-router-dom";

function ManageProduct({action}) {

    const  {productId_or_orderId} =  useParams();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subCategory: "",
    price: "",
    discount: "",
    description: "",
    files: [],
  });

  const [categoriesData, setCategoriesData] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categories();

        if (!response.status) {
          handleError("Some Error Occured");
        } else {
          setCategoriesData(response.data);
        }
      } catch (error) {
        handleError(error.message);
      }
    };

    fetchCategories();
  }, []);

  const numberOfImagesAllowed = 5;

  const handleInputChangeEventForFiles = (ev, index) => {
    const file = ev.target.files[0];
    if (file)
      document
        .getElementById(`product_image_${index}`)
        .setAttribute("src", URL.createObjectURL(file));
    if (formData.files.indexOf(file) == -1) {
      setFormData((prevData) => {
        const updatedFiles = [...prevData.files];
        updatedFiles[index] = file;
        return {
          ...prevData,
          files: updatedFiles,
        };
      });
    }
  };

  const handleInputChangeEvent = (ev) => {
    const { name, value } = ev.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.toString(),
    }));
  };

  const handleProductAddFormSubmit = async (ev) => {
    ev.preventDefault();
    const { name, category, subCategory, price, discount, description, files } =
      formData;
    if (
      !name ||
      !category ||
      !subCategory ||
      !price ||
      !discount ||
      !description
    )
      return handleError("All Fields  Are  Mandatory");
    else if (files.length == 0)
      return handleError("Please  Upload Atleast One Picture");
    else {
      try {
        const response = await createProduct(
          localStorage.getItem("token"),
          "seller/product",
          formData
        );
        if (!response.status) {
          handleError("Some Error  Occured");
        } else {
          handleSuccess("Product Created Successfully");
          setTimeout(() => window.location.reload(), 4000);
        }
      } catch (error) {
        handleError(error.message);
      }
    }
  };

  const handleCategoryChangeEvent = async (ev) => {
    const { _, value } = ev.target;
    categoriesData.forEach((category) => {
      if (category.name == value) {
        setSubCategoriesData(category.subCategory);
      }
    });
  };


  return (
    <>
      <h1 className="font-semibold mb-4">{action.split('_')[0].chartAt(0).toUpperCase() + action.split('_')[0].slice(1)}</h1>

      {/* Image Upload Section */}
      <div className="imageContainer my-4 flex flex-wrap items-center justify-center gap-4">
        {Array(Math.max(1, numberOfImagesAllowed))
          .fill(null)
          .map((_, index) => (
            <form
              encType="multipart/form-data"
              className="relative w-[90px] h-[90px]"
              key={index}
            >
              <img
                src="https://placehold.co/120/png"
                id={`product_image_${index}`}
                alt="product pic"
                className="w-full h-full rounded-md border border-slate-300 shadow-sm object-cover   object-top"
              />
              <input
                type="file"
                name="profilePic"
                className="hidden"
                id={`product_pic_${index}`}
                onChange={(ev) => handleInputChangeEventForFiles(ev, index)}
              />
              <button
                type="button"
                className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-md"
                onClick={(ev) => {
                  ev.preventDefault();
                  document.getElementById(`product_pic_${index}`).click();
                }}
              >
                <FontAwesomeIcon
                  icon={faCamera}
                  className="text-white text-lg"
                />
              </button>
            </form>
          ))}
      </div>
      <p className="text-sm text-center italic">
        Product Pictures{" "}
        <small>
          (maximum{" "}
          <span className="font-semibold">{numberOfImagesAllowed}</span> uploads
          are allowed)
        </small>
      </p>

      {/* Divider */}
      <hr className="my-6 border-gray-300" />

      {/* Product Details Form */}
      <form onSubmit={handleProductAddFormSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleInputChangeEvent}
          value={formData["name"]}
          className="block w-full border border-zinc-300 rounded-md py-2 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
        <select
          name="category"
          id="category"
          className="block w-full border border-zinc-300 rounded-md py-2 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          onChange={(ev) => {
            handleInputChangeEvent(ev);
            handleCategoryChangeEvent(ev);
          }}
          required
        >
          <option value="" hidden>
            Choose Category
          </option>
          {categoriesData.map((category, index) => (
            <option value={category.name} key={index}>
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </option>
          ))}
        </select>
        <select
          name="subCategory"
          id="subCategory"
          className="block w-full border border-zinc-300 rounded-md py-2 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          onChange={handleInputChangeEvent}
          required
        >
          <option value="" hidden>
            Choose Sub Category
          </option>
          {subCategoriesData.map((category, index) => (
            <option value={category.name} key={index}>
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="price"
          placeholder="Product Price (INR)"
          onChange={handleInputChangeEvent}
          value={formData["price"]}
          className="block w-full border border-zinc-300 rounded-md py-2 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="discount"
          placeholder="Discount on Product (INR)"
          onChange={handleInputChangeEvent}
          value={formData["discount"]}
          className="block w-full border border-zinc-300 rounded-md py-2 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          onChange={handleInputChangeEvent}
          value={formData["description"]}
          className="block w-full border border-zinc-300 rounded-md py-2 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
          rows={4}
          required
        ></textarea>
        <input
          type="submit"
          value="Create Product"
          className="  px-2 bg-blue-600 text-white font-semibold py-1  text-xs rounded-md shadow-md hover:bg-blue-700 transition-colors"
        />
      </form>
      <ToastContainer />
    </>
  );
}

export default ManageProduct;