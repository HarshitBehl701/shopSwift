import React, { useState } from "react";
import UserLoginRegisterForm from "../components/UserLoginRegisterForm";
import { handleError, handleSuccess } from "../utils/toastContainerHelperfn";
import { useNavigate } from "react-router-dom";
import { handleFormInputChangeEvent } from "../utils/formHandlers";
import { handleUserSellerLoginRequest } from "../utils/formHandlers";

function Login() {

  const  navigate = useNavigate();

  const [formData, updateFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormInputFieldsOnChange = (ev) => handleFormInputChangeEvent(ev,updateFormData);

  const handleFormSubmit = async (ev) => {
    const response  = await handleUserSellerLoginRequest(ev,formData,'loginUserApiRequest','user');

    if(!response.status) handleError(response.message);
    else{
        handleSuccess('Successfully  Login  to  your Account');        
        setTimeout(()=> handleSuccess('Redirecting you  to the home page'),1000);
        setTimeout(() => navigate('/home'),2000);
    }  
  }

  const leftPanelObj = {
    header: 'Join the <span  class="text-blue-600 hover:text-blue-700">Scatch</span> Community!',
    subParaText:"Log in to access the best deals, manage your orders, and explore endless shopping possibilities."
  }

  const rightPanelObj  = {
    handleFormSubmit:handleFormSubmit,
    handleFormInputFieldsOnChange:handleFormInputFieldsOnChange,
    formData:  formData,
    linkText:"Don't have  an  account?",
    redirectionLink:"/register",
    submitFormBtnTxt:"Login",
    nameFieldRequired:false
  }

  return (
    <UserLoginRegisterForm leftPanelObj={leftPanelObj}   rightPanelObj={rightPanelObj} />
  );
}

export default Login;
