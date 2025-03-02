import { IGetProductAllOrders, IGetUserAllOrders, IManageOrder } from "@/interfaces/apiInterfaces";
import { axiosInstance, handleApiResponse, orderRoutes } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('order');

export  const manageOrder = async   (data:IManageOrder) => {
    try {
        const response = await apiInstance.post(orderRoutes['manageOrder'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const getProductAllOrders = async   (data:IGetProductAllOrders) => {
    try {
        const response = await apiInstance.post(orderRoutes['getProductAllOrders'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const getAllOrders = async   () => {
    try {
        const response = await apiInstance.post(orderRoutes['getAllOrders']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const getUserAllOrders = async   (data:IGetUserAllOrders) => {
    try {
        const response = await apiInstance.post(orderRoutes['getUserAllOrders'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}