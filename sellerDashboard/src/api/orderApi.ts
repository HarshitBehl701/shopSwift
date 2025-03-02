import { IGetAllProductOrders, IMangeOrder} from "@/interfaces/apiInterfaces";
import { axiosInstance, handleApiResponse, orderRoutes } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('order');

export  const manageOrder = async (data:IMangeOrder) => {
    try {
        const response = await apiInstance.post(orderRoutes['manageOrder'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error)
    }
}

export  const getProductAllOrders = async (data:IGetAllProductOrders) => {
    try {
        const response = await apiInstance.post(orderRoutes['getProductAllOrders'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error)
    }
}

export  const getSellerAllOrders = async () => {
    try {
        const response = await apiInstance.post(orderRoutes['getSellerAllOrders']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error)
    }
}
