import React , {useState} from "react";
import { handleError, handleSuccess } from "../utils/toastContainerHelperfn";
import SellerLoginRegisterForm from "../components/SellerLoginRegisterForm";
import { useNavigate } from "react-router-dom";
import { handleUserSellerLoginRequest,handleFormInputChangeEvent } from "../utils/formHandlers";

function SellerLogin() {
  const navigate =  useNavigate();
  const [formData, updateFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormInputFieldsOnChange = (ev) => handleFormInputChangeEvent(ev,updateFormData);

  const handleFormSubmit = async   (ev) => {
    const  response  = await handleUserSellerLoginRequest(ev,formData,'loginSellerApiRequest','seller');
    if(!response.status) handleError(response.message);
    else{
        handleSuccess('Successfully  Login  to  your Account');        
        setTimeout(()=> handleSuccess('Redirecting you  to the home page'),1000);
        setTimeout(() => navigate('/home'),2000);
    }
  };

  const leftPanelObj = {
    header:
      'Join the <span  class="text-blue-600 hover:text-blue-700">Scatch</span> Community!',
    subParaText:
      "Log in to access the best deals, manage your orders, and explore endless shopping possibilities.",
  };

  const rightPanelObj = {
    heading: "Seller Login",
    registration: false,
    formData: formData,
    handleFormInputFieldsOnChange: handleFormInputFieldsOnChange,
    handleFormSubmit: handleFormSubmit,
    linkTextPath: "/seller-registration",
    linkText: "Don't  have account?",
  };

  return (
    <SellerLoginRegisterForm
      leftPanelObj={leftPanelObj}
      rightPanelObj={rightPanelObj}
    />
  );
}

export default SellerLogin;
