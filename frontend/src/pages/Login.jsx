import React, { useState } from "react";
import UserLoginRegisterForm from "../components/UserLoginRegisterForm";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { handleError, handleSuccess } from "../utils";

function Login() {
  const [formInputFields, updateFormInputFields] = useState({
    email: "",
    password: "",
  });

  const handleFormInputFieldsOnChange = (ev) => {
    const { name, value } = ev.target;
    updateFormInputFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    const { email, password } = formInputFields;

    if (email == "" || password == "") handleError("All Fields  Are  Required");
    else if (password.length < 8 || password.length > 16)
      handleError("Password Length Must Be Between 8 - 16 Characters");
  };

  const leftPanelObj = {
    header: 'Join the <span  class="text-blue-600 hover:text-blue-700">Scatch</span> Community!',
    subParaText:"Log in to access the best deals, manage your orders, and explore endless shopping possibilities."
  }

  const rightPanelObj  = {
    handleFormSubmit:handleFormSubmit,
    handleFormInputFieldsOnChange:handleFormInputFieldsOnChange,
    formInputFields:  formInputFields,
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
