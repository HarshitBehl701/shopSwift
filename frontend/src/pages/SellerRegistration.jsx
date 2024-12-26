import React, { useState } from 'react'
import SellerLoginRegisterForm from '../components/SellerLoginRegisterForm'
import { handleError, handleSuccess } from "../utils";

function SellerRegistration() {

    const [formData,updateFormData]  =  useState({
        fullName: "",
        email: "",
        brandName:  "",
        password: "",
    })

    const handleFormInputFieldsOnChange = (ev) => {
        const { name , value } = ev.target;
        updateFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      const handleFormSubmit = (ev) => {
          ev.preventDefault();
          const { fullName, email, brandName,password } = formData;
      
          if (email == "" || password == "") handleError("All Fields  Are  Required");
          else if (password.length < 8 || password.length > 16)
            handleError("Password Length Must Be Between 8 - 16 Characters");
        };

    const  leftPanelObj =  {
    header: 'Join the <span  class="text-blue-600 hover:text-blue-700">Scatch</span> Community!',
    subParaText:"Log in to access the best deals, manage your orders, and explore endless shopping possibilities."
    }
    
    const   rightPanelObj  = {
        heading: "Seller   Registration",
        registration:true,
        formData: formData,
        handleFormInputFieldsOnChange: handleFormInputFieldsOnChange,
        handleFormSubmit: handleFormSubmit,
        linkTextPath: '/seller-login',
        linkText: 'Already Registered?'
    }

  return (
    <SellerLoginRegisterForm leftPanelObj={leftPanelObj} rightPanelObj={rightPanelObj} />
  )
}

export default SellerRegistration