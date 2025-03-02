import { IGetSellerAllProducts, IManageProduct, IManageUserCart, IManageUserWhislist } from "@/interfaces/apiInterfaces";
import { axiosInstance, handleApiResponse, productRoutes } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('product');

export  const manageProduct = async   (data:IManageProduct) => {
    try {
        let response;
        if(('images' in  data &&  data.images) || ('deleteImages' in  data &&   data.deleteImages !== ''))
        {
            const formData  =  new  FormData();
            formData.append("product_id",data.product_id.toString());
            if(data.images)
            {
                data.images.forEach((file) => {
                    formData.append(`images[]`, file); // Ensuring unique key names
                });
            }
            if(data.deleteImages)
                formData.append("deleteImages",data.deleteImages);
            response  =  await apiInstance.post(productRoutes['manageProduct'],formData) as AxiosResponse;
        }else  
            response = await apiInstance.post(productRoutes['manageProduct'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const getSellerAllProducts = async   (data:IGetSellerAllProducts) => {
    try {
        const response = await apiInstance.post(productRoutes['getSellerAllProducts'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const getAllProducts = async   () => {
    try {
        const response = await apiInstance.post(productRoutes['getAllProducts']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const getAllLiveProducts = async   () => {
    try {
        const response = await apiInstance.post(productRoutes['getAllLiveProducts']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const manageUserCart = async   (data:IManageUserCart) => {
    try {
        const response = await apiInstance.post(productRoutes['manageUserCart'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const manageUserWhislist = async   (data:IManageUserWhislist) => {
    try {
        const response = await apiInstance.post(productRoutes['manageUserWhislist'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}