import React, { useState } from "react";
import UserLoginRegisterForm from "../components/UserLoginRegisterForm";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { handleError, handleSuccess } from "../utils";

function Login() {
  const [currentPasswordState, updateCurrentPasswordState] = useState({
    input: "password",
    icon: faEyeSlash,
  });

  const [formInputFields, updateFormInputFields] = useState({
    email: "",
    password: "",
  });

  const handleUpdateCurrentPasswordState = () => {
    updateCurrentPasswordState({
      input: currentPasswordState.input == "password" ? "text" : "password",
      icon: currentPasswordState.input == "password" ? faEye : faEyeSlash,
    });
  };

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

  return (
    <UserLoginRegisterForm
      subParaText={
        "Log in to access the best deals, manage your orders, and explore endless shopping possibilities."
      }
      handleFormSubmit={handleFormSubmit}
      handleFormInputFieldsOnChange={handleFormInputFieldsOnChange}
      currentPasswordState={currentPasswordState}
      handleUpdateCurrentPasswordState={handleUpdateCurrentPasswordState}
      linkText={"Don't have  an  account?"}
      redirectionLink={"/register"}
      submitFormBtnTxt={"Login"}
      nameFieldRequired={false}
    />
  );
}

export default Login;
