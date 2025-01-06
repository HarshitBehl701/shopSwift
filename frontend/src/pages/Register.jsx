import React, { useState } from "react";
import UserLoginRegisterForm from "../components/UserLoginRegisterForm";
import { handleError, handleSuccess } from "../utils/toastContainerHelperfn";
import {handleFormInputChangeEvent}  from "../utils/formHandlers";
import { useNavigate } from "react-router-dom";
import  {handleRegisterLoginFormSubmitEvent}  from "../utils/formHandlers";

function Register() {
  const navigate  = useNavigate();  

  const [formData, updateFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormInputs  = (ev)  => handleFormInputChangeEvent(ev,updateFormData);

  const  handleFormSubmit = async (ev)  => {
    const  response = await handleRegisterLoginFormSubmitEvent(ev,formData,'registerUserApiRequest')
    if(response.status){
        handleSuccess('Successfully Created Account');
        setTimeout(() => handleSuccess('Redirecting  you to  login  page'),1000);
        setTimeout(() => navigate('/login'),2000);    
    }else{
        handleError(response.message)
    }
  };

  const leftPanelObj = {
    header:
      'Join the <span  class="text-blue-600 hover:text-blue-700">Scatch</span> Community!',
    subParaText:
      "Create an account to unlock personalized shopping experiences, exclusive offers, and more.",
  };


  const rightPanelObj = {
    handleFormSubmit: handleFormSubmit,
    handleFormInputFieldsOnChange: handleFormInputs,
    formData: formData,
    linkText: "Already have  an  account?",
    redirectionLink: "/login",
    submitFormBtnTxt: "Register",
    nameFieldRequired: true,
  };

  return (
    <UserLoginRegisterForm
    leftPanelObj={leftPanelObj}
    rightPanelObj={rightPanelObj}
    />
  );
}

export default Register;
