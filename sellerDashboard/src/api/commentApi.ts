import { IGetOrderAllComments} from "@/interfaces/apiInterfaces";
import { axiosInstance, commentRoutes, handleApiResponse } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('comment');

export  const getOrderAllComments = async (data:IGetOrderAllComments) => {
    try {
        const response = await apiInstance.post(commentRoutes['getAllOrderComments'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}