import { ICreateNewComment, IManageComment, IOrderAllComments, IProductAllComments} from "@/interfaces/apiInterfaces";
import { axiosInstance, handleApiResponse, commentRoutes } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('comment');

export  const addNewComment = async (data:ICreateNewComment) => {
    try {
        const response = await apiInstance.post(commentRoutes['createComment'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}

export  const manageComment = async (data:IManageComment) => {
    try {
        const response = await apiInstance.post(commentRoutes['manageComment'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}

export  const getAllOrderComments = async (data:IOrderAllComments) => {
    try {
        const response = await apiInstance.post(commentRoutes['getOrderAllComments'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}

export  const getAllProductComments = async (data:IProductAllComments) => {
    try {
        const response = await apiInstance.post(commentRoutes['getProductAllComments'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}