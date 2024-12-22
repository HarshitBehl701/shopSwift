import React, { useState } from "react";
import UserLoginRegisterForm from "../components/UserLoginRegisterForm";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { handleError, handleSuccess } from "../utils";

function Register() {
  const [currentPasswordState, updateCurrentPasswordState] = useState({
    input: "password",
    icon: faEyeSlash,
  });

  const [formInputFields, updateFormInputFields] = useState({
    name: "",
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
    const { name, email, password } = formInputFields;

    if (name == "" || email == "" || password == "")
      handleError("All Fields  Are  Required");
    else if (password.length < 8 || password.length > 16)
      handleError("Password Length Must Be Between 8 - 16 Characters");
  };

  return (
    <UserLoginRegisterForm
      subParaText={
        "Create an account to unlock personalized shopping experiences, exclusive offers, and more."
      }
      handleFormSubmit={handleFormSubmit}
      handleFormInputFieldsOnChange={handleFormInputFieldsOnChange}
      currentPasswordState={currentPasswordState}
      handleUpdateCurrentPasswordState={handleUpdateCurrentPasswordState}
      linkText={"Already have  an  account?"}
      redirectionLink={"/login"}
      submitFormBtnTxt={"Register"}
      nameFieldRequired={true}
    />
  );
}

export default Register;
