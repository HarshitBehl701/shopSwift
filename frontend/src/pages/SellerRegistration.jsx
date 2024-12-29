import React, { useState } from 'react'
import SellerLoginRegisterForm from '../components/SellerLoginRegisterForm'
import { handleError, handleSuccess } from "../utils";
import { registerUser } from '../api/authUsers';
import { useNavigate } from 'react-router-dom';

function SellerRegistration() {
  const navigate   = useNavigate();
    const [formData,updateFormData]  =  useState({
        fullname: "",
        email: "",
        brandname:  "",
        password: "",
    })

    const handleFormInputFieldsOnChange = (ev) => {
        const { name , value } = ev.target;
        updateFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      const handleFormSubmit =   async (ev) => {
          ev.preventDefault();
          const { fullname, email, brandname,password } = formData;
      
          if (fullname == "" ||  brandname   ==   "" || email == "" || password == "") handleError("All Fields  Are  Required");
          else if (password.length < 8 || password.length > 16)
            handleError("Password Length Must Be Between 8 - 16 Characters");
          else{
            try{
              const response   = await registerUser(formData,'seller');
              if(response.status)  handleSuccess('Successfully Registered  you  as a seller');              
              setTimeout(()  => {handleSuccess('Redirecting you  to login page')},1000);
              setTimeout(() => {navigate('/seller-login')},2000);

            }catch(error){
              handleError(error.message);
            }
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
        linkTextPath: '/seller-login',
        linkText: 'Already Registered?'
    }

  return (
    <SellerLoginRegisterForm leftPanelObj={leftPanelObj} rightPanelObj={rightPanelObj} />
  )
}

export default SellerRegistration