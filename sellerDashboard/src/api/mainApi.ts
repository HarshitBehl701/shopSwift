import { axiosInstance, handleApiResponse, mainRoutes } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('main');

export  const getAllCategoriesAndSubCategories = async () => {
    try {
        const response = await apiInstance.post(mainRoutes['getAllActiveCategoriesSubCategories']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        throw  handleCatchErrorsOfApi(error);
    }
}