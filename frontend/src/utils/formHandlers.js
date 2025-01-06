import { registerUser, loginUser } from "../api/authUsers";
import {
  isEmptyObject,
  getLocalStorageVariables,
  setLocalStorageVariables,
} from "./commonHelper";
import { updateUser } from "../api/user";

export const handleFormInputChangeEvent = (ev, updateFormFn) => {
  const { name, value } = ev.target;
  updateFormFn((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

export const handleRegisterLoginFormSubmitEvent = async (
  ev,
  formData,
  submissionApiName
) => {
  ev.preventDefault();
  const requestApiNames = {
    registerUserApiRequest: {
      type: "user",
      api: registerUser,
    },
    registerSellerApiRequest: {
      type: "seller",
      api: registerUser,
    },
    loginUserApiRequest: {
      type: "user",
      api: loginUser,
    },
    loginSellerApiRequest: {
      type: "seller",
      api: loginUser,
    },
  };

  if (!requestApiNames[submissionApiName])
    return { status: false, message: "Action  is  not specified" };

  try {
    if (isEmptyObject(formData))
      return {
        status: false,
        message:
          "All Fields Are Mandatory,  Please  Fill  The  Form  Correctly",
      };
    const requestedApi = requestApiNames[submissionApiName];
    const response = await requestedApi.api(formData, requestedApi.type);
    if (!response.status)
      return {
        status: false,
        message: "Some  Unexpected Error  Occured ,  Please Try Again Later",
      };

    return {
      status: true,
      message: "Form Submitted Successfully",
      data: response,
    };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const handleUserSellerLoginRequest = async (
  ev,
  formData,
  submissionApiName,
  userType
) => {
  try {
    const response = await handleRegisterLoginFormSubmitEvent(
      ev,
      formData,
      submissionApiName
    );

    if (!response.status) return response;

    setLocalStorageVariables({
      token: response.data.token,
      userType: userType,
    });

    return { status: true, message: "User Login Successfully" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const handleUpdateProfileFormSubmit = async (formData) => {
  try {
    const [token, userType] = getLocalStorageVariables("all");
    const newFormData = { ...formData };
    delete newFormData.email;
    newFormData.contact = newFormData.contact.toString();
    const response = await updateUser(token, newFormData, userType);

    if (!response.status) return { status: false, message: response.message };

    return { status: true, message: "Profile Updated  Successfully" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};
