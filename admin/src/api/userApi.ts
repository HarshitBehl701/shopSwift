import { IGetUserDetails, IManageUser, IUpdateUserPhoto } from "@/interfaces/apiInterfaces";
import { userRoutes, axiosInstance, handleApiResponse } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('user');

export  const manageUser = async   (data:IManageUser) => {
    try {
        const response = await apiInstance.post(userRoutes['manageUser'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const updateUserPhoto = async   (data:IUpdateUserPhoto) => {
    try {
        const formData = new FormData();
        formData.append('user_id',data.user_id);
        formData.append("userPhoto",data.userPhoto);
        const response = await apiInstance.post(userRoutes['updateUserPhotoForAdmin'],formData) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const getAllUsers = async   () => {
    try {
        const response = await apiInstance.post(userRoutes['getAllUsers']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const getUserDetails = async   (data:IGetUserDetails) => {
    try {
        const response = await apiInstance.post(userRoutes['getUserDetails'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}