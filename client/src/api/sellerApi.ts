import { IRegisterNewSeller} from "@/interfaces/apiInterfaces";
import { axiosInstance, handleApiResponse, sellerRoutes } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('seller');

export  const registerSeller = async (data:IRegisterNewSeller) => {
    try {
        const response = await apiInstance.post(sellerRoutes['register'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}