import React, { useState,useEffect, useImperativeHandle } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faHouseChimneyUser,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import {createProduct} from '../api/product';

function AddProduct() {
  const requiredFields = [
    "name",
    "category",
    "price",
    "discount",
    "description",
  ];
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discount: "",
    description: "",
    files: [],
  });

  const  numberOfImagesAllowed = 5;

  const handleInputChangeEventForFiles = (ev,index) => {
    const  file  = ev.target.files[0];
    if(file)  document.getElementById(`product_image_${index}`).setAttribute('src',URL.createObjectURL(file));
    setFormData((prevData) =>  ({
      ...prevData,
      files: [...(prevData.files || []),file],
    }))
  }

  const handleInputChangeEvent  = (ev) => {
    const { name, value } = ev.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]: value.toString(),
    }))
  }

  const  handleProductAddFormSubmit = async  (ev) =>{
    ev.preventDefault();
    
    const  {name,category,price,discount,description,files}  = formData;
    if(!name || !category || !price  || !discount || !description) return handleError('All Fields  Are  Mandatory');
    else if(files.length == 0) return handleError('Please  Upload Atleast One Picture');
    else{
      try{
        const response   = await createProduct(localStorage.getItem("token"),localStorage.getItem('userType'),formData);
        console.log(response);
      }catch(error){
        handleError(error.message);
      }
    }
  }

  return (
    <>
      <h1 className="font-semibold">Add Product</h1>
      <div className="imageContainer my-3 flex flex-wrap items-center justify-center gap-3">
      {Array((numberOfImagesAllowed  < 1) ? 1 : numberOfImagesAllowed).fill(null).map((_,index) => 
      <form encType='multipart/form-data'  className="w-fit h-fit   relative" key={index}>
      <img src='https://placehold.co/150/png' id={`product_image_${index}`} alt="profile pic" className="w-[100px] h-[100px] rounded-md  border border-slate-300  shadow-sm object-cover  object-top" />
          <input
            type="file"
            name="profilePic"
            className="hidden"
            id={`product_pic_${index}`}
            onChange={(ev) => handleInputChangeEventForFiles(ev,index)}
          />
          <button
            type="submit"
            className="w-[100px] h-[100px] border absolute top-0 cursor-pointer"
            onClick={(ev) => {
              ev.preventDefault();
              document.getElementById(`product_pic_${index}`).click();
            }}
          >
            <FontAwesomeIcon icon={faCamera} className="text-lg text-white" />
            </button>
        </form>
      )}
      </div>
      <p className="text-xs text-center italic">Product Pictures <small>(maximum <span className="font-semibold">{numberOfImagesAllowed}</span> uploads are allowed)</small></p>
      <br />
      <hr />
      <br />
      <form onSubmit={handleProductAddFormSubmit}>
        {requiredFields.map((field, index) => (
          <input
            key={index}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            onChange={handleInputChangeEvent}
            value={formData[field]}
            className="block my-2 w-full border-zinc-300 outline-none rounded-md"
            required
          />
        ))}
        <input
          type="submit"
          value="Create  Product"
          className="font-semibold mt-4 text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white  rounded-md  shadow-sm  cursor-pointer"
        />
      </form>
      <ToastContainer  />
    </>
  );
}

export default AddProduct;
