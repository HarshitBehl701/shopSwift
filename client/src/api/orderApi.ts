import { ICancelOrder, IManageOrderRating, IPlaceNewOrder} from "@/interfaces/apiInterfaces";
import { axiosInstance, handleApiResponse, orderRoutes } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('order');

export  const placeNewOrder = async (data:IPlaceNewOrder) => {
    try {
        const response = await apiInstance.post(orderRoutes['placeNewOrder'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}

export  const cancelOrder = async (data:ICancelOrder) => {
    try {
        const response = await apiInstance.post(orderRoutes['cancelOrder'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}

export  const manageOrderRating = async (data:IManageOrderRating) => {
    try {
        const response = await apiInstance.post(orderRoutes['manageOrderRating'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}

export  const getUserAllOrders = async () => {
    try {
        const response = await apiInstance.post(orderRoutes['getUserAllOrders']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}
