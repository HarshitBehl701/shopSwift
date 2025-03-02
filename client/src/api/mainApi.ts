import { ICreateContactForm } from "@/interfaces/apiInterfaces";
import { axiosInstance, handleApiResponse, mainRoutes } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('main');

export  const getAllActiveCategoriesSubCategories = async () => {
    try {
        const response = await apiInstance.post(mainRoutes['getAllActiveCategoriesSubCategories']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}

export  const createNewContactForm = async (data:ICreateContactForm) => {
    try {
        const response = await apiInstance.post(mainRoutes['submitContactForm'],data) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error);
    }
}
