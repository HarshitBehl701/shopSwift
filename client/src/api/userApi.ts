import { ILoginUser, IRegisterNewUser, IUpdateUserAccount, IVerifyUser} from "@/interfaces/apiInterfaces";
import { axiosInstance,userRoutes, handleApiResponse } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('user');

export  const registerUser = async (data:IRegisterNewUser) => {
    try {
        const response = await apiInstance.post(userRoutes['register'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}

export  const loginUser = async (data:ILoginUser) => {
    try {
        const response = await apiInstance.post(userRoutes['login'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}

export  const logoutUser = async () => {
    try {
        const response = await apiInstance.post(userRoutes['logout']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}

export  const verifyUser = async (data:IVerifyUser) => {
    try {
        const response = await apiInstance.post(userRoutes['verify_account'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}

export  const getAccountDetails = async () => {
    try {
        const response = await apiInstance.post(userRoutes['getAccountDetails']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}

export  const updateUserAccount = async (data:IUpdateUserAccount) => {
    try {
        const  formData  = new  FormData();
        if(data.user_name)
            formData.append("user_name",data.user_name);
        
        if(data.user_email)
            formData.append("user_email",data.user_email);
        
        if(data.user_password)
            formData.append("user_password",data.user_password);

        if(data.userPhoto)
            formData.append("userPhoto",data.userPhoto);
        
        if(data.address)
            formData.append("address",data.address);

        const response = await apiInstance.post(userRoutes['updateAccountDetails'],formData) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}