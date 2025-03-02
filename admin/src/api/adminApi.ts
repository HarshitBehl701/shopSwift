import { IGetAdminDetailsParam, ILoginAdmin, IRegisterNewAdmin, IUpdateAdminAccount } from "@/interfaces/apiInterfaces";
import { adminRoutes, axiosInstance, handleApiResponse } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('admin');

export  const registerNewAdmin = async (data:IRegisterNewAdmin) => {
    try {
        const response = await apiInstance.post(adminRoutes['register'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const loginAdmin = async   (data:ILoginAdmin) => {
    try {
        const response = await apiInstance.post(adminRoutes['login'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error)
    }
}

export  const logoutAdmin = async   () => {
    try {
        const response = await apiInstance.post(adminRoutes['logout']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error)
    }
}

export const updateAdminAccount = async (data:IUpdateAdminAccount) => {
    try {
        const response = await apiInstance.post(adminRoutes['updateAccount'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error)
    }
}

export const getLoginAdminDetails = async () => {
    try {
        const response = await apiInstance.post(adminRoutes['getLoginAdminDetails']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error)
    }
}

export const getAdminDetails = async (data:IGetAdminDetailsParam) => {
    try {
        const response = await apiInstance.post(adminRoutes['getAdminDetails'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error)
    }
}

export const getAllAdmins = async () => {
    try {
        const response = await apiInstance.post(adminRoutes['getAllAdmins']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error)
    }
}