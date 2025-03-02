import { IGetOrderAllComments, IGetUserAllComments, IUpdateComment } from "@/interfaces/apiInterfaces";
import { axiosInstance, handleApiResponse, orderRoutes } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('comment');

export  const manageComment = async   (data:IUpdateComment) => {
    try {
        const response = await apiInstance.post(orderRoutes['manageComment'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const getOrderAllComments = async   (data:IGetOrderAllComments) => {
    try {
        const response = await apiInstance.post(orderRoutes['getOrderAllComments'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const getUserAllComments = async   (data:IGetUserAllComments) => {
    try {
        const response = await apiInstance.post(orderRoutes['getUserAllComments'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}
export  const getAllComments = async   () => {
    try {
        const response = await apiInstance.post(orderRoutes['getAllComments']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}