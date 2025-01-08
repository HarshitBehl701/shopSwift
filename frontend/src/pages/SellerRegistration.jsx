import React, { useState } from 'react'
import SellerLoginRegisterForm from '../components/SellerLoginRegisterForm'
import { handleError, handleSuccess } from "../utils/toastContainerHelperfn";
import { useNavigate } from 'react-router-dom';
import { handleFormInputChangeEvent, handleRegisterLoginFormSubmitEvent } from '../utils/formHandlers';

function SellerRegistration() {
  const navigate   = useNavigate();
    const [formData,updateFormData]  =  useState({
        fullname: "",
        email: "",
        brandname:  "",
        password: "",
    })

    const handleFormInputFieldsOnChange = (ev) => handleFormInputChangeEvent(ev,updateFormData);

      const handleFormSubmit =   async (ev) => {
        
        const response  = await  handleRegisterLoginFormSubmitEvent(ev,formData,'registerSellerApiRequest')
          if(response.status){
              handleSuccess('Successfully Created Account');
              setTimeout(() => handleSuccess('Redirecting  you to  login  page'),1000);
              setTimeout(() => navigate('/seller-login'),2000);    
          }else{
              handleError(response.message)
          }
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
        redirectionLink: '/seller-login',
        linkText: 'Already Registered?'
    }

  return (
    <SellerLoginRegisterForm leftPanelObj={leftPanelObj} rightPanelObj={rightPanelObj} currentPage={'registration'} />
  )
}

export default SellerRegistration