import React , {useState} from "react";
import { handleError, handleSuccess } from "../utils";
import SellerLoginRegisterForm from "../components/SellerLoginRegisterForm";

function SellerLogin() {
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

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    const { email, password } = formData;

    if (email == "" || password == "") handleError("All Fields  Are  Required");
    else if (password.length < 8 || password.length > 16)
      handleError("Password Length Must Be Between 8 - 16 Characters");
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
    linkTextPath: "/seller-login",
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
