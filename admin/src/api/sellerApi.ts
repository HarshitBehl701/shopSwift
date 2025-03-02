import { IGetSellerDetails, IManageSeller, IUpdateSellerPhoto } from "@/interfaces/apiInterfaces";
import { axiosInstance, handleApiResponse, sellerRoutes } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('seller');

export  const manageSeller = async   (data:IManageSeller) => {
    try {
        const response = await apiInstance.post(sellerRoutes['manageSeller'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const updateSellerPhoto = async   (data:IUpdateSellerPhoto) => {
    try {
        const formData = new FormData();
        formData.append('seller_id',data.seller_id);
        formData.append("brandLogo",data.brand_logo);
        const response = await apiInstance.post(sellerRoutes['updateSellerPhotoForAdmin'],formData) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const getAllSellers = async   () => {
    try {
        const response = await apiInstance.post(sellerRoutes['getAllSellers']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const getSellerDetails = async   (data:IGetSellerDetails) => {
    try {
        const response = await apiInstance.post(sellerRoutes['getSellerDetails'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}