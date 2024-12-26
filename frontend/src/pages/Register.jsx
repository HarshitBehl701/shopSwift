import React, { useState } from "react";
import UserLoginRegisterForm from "../components/UserLoginRegisterForm";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { handleError, handleSuccess } from "../utils";

function Register() {
  const [formInputFields, updateFormInputFields] = useState({
    name: "",
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
    const { name, email, password } = formInputFields;

    if (name == "" || email == "" || password == "")
      handleError("All Fields  Are  Required");
    else if (password.length < 8 || password.length > 16)
      handleError("Password Length Must Be Between 8 - 16 Characters");
  };

  const leftPanelObj = {
    header:
      'Join the <span  class="text-blue-600 hover:text-blue-700">Scatch</span> Community!',
    subParaText:
      "Create an account to unlock personalized shopping experiences, exclusive offers, and more.",
  };

  const rightPanelObj = {
    handleFormSubmit: handleFormSubmit,
    handleFormInputFieldsOnChange: handleFormInputFieldsOnChange,
    formInputFields: formInputFields,
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
