import { ILoginSeller, IUpdateSellerAccount, IUpdateSellerBrandLogo, IVerifySellerAccount } from "@/interfaces/apiInterfaces";
import { axiosInstance, handleApiResponse, sellerRoutes } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('seller');

export  const verifySellerAccount = async (data:IVerifySellerAccount) => {
    try {
        const response = await apiInstance.post(sellerRoutes['verifyAccount'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error)
    }
}

export  const loginSeller = async (data:ILoginSeller) => {
    try {
        const response = await apiInstance.post(sellerRoutes['login'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error)
    }
}

export  const logoutSeller = async () => {
    try {
        const response = await apiInstance.post(sellerRoutes['logout']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error)
    }
}

export  const updateAccount = async (data:IUpdateSellerAccount) => {
    try {
        const response = await apiInstance.post(sellerRoutes['updateAccount'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error)
    }
}

export  const updateProfilePhoto = async (data:IUpdateSellerBrandLogo) => {
    try {
        const formData = new FormData();
        formData.append("brandLogo",data.brandLogo)
        const response = await apiInstance.post(sellerRoutes['updateProfilePhoto'],formData) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error)
    }
}

export  const getSellerDetails = async () => {
    try {
        const response = await apiInstance.post(sellerRoutes['getAccountDetail']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error)
    }
}
