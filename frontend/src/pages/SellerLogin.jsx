import React , {useState} from "react";
import { handleError, handleSuccess } from "../utils";
import SellerLoginRegisterForm from "../components/SellerLoginRegisterForm";
import { loginUser } from "../api/authUsers";
import { useNavigate } from "react-router-dom";

function SellerLogin() {
  const navigate =  useNavigate();
  const [formData, updateFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormInputFieldsOnChange = (ev) => {
    const { name, value } = ev.target;
    updateFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async   (ev) => {
    ev.preventDefault();
    const { email, password } = formData;

    if (email == "" || password == "") handleError("All Fields  Are  Required");
    else if (password.length < 8 || password.length > 16)
      handleError("Password Length Must Be Between 8 - 16 Characters");
    else{
      try{
        const response =  await  loginUser(formData,'seller');
        localStorage.setItem('token',response.token);
        localStorage.setItem('userType','seller');
        
        if(response.status)  handleSuccess('Successfully login  to  your account');

        setTimeout(()=>{handleSuccess('Redirecting   you to home  page')},1000);

        setTimeout(()  => {navigate('/home')},2000);
      }catch(error){
        handleError(error.message);
      }
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
