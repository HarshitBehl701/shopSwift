import { IManageUserCart, IManageUserWhislist} from "@/interfaces/apiInterfaces";
import { axiosInstance, handleApiResponse, productRoutes } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('product');

export  const getAllLiveProducts = async () => {
    try {
        const response = await apiInstance.post(productRoutes['getAllLiveProducts']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}

export  const manageUserCart = async (data:IManageUserCart) => {
    try {
        const response = await apiInstance.post(productRoutes['manageUserCart'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}

export  const manageUserWhislist = async (data:IManageUserWhislist) => {
    try {
        const response = await apiInstance.post(productRoutes['manageUserWhislist'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}