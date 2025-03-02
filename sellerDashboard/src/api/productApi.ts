import { ICreateNewProduct, IManageProduct} from "@/interfaces/apiInterfaces";
import { axiosInstance, handleApiResponse, productRoutes } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('product');

export  const createNewProduct = async (data:ICreateNewProduct) => {
    try {
        const formData  =  new  FormData();
        formData.append("product_name",data.product_name)
        formData.append("description",data.description)
        formData.append("category",data.category.toString())
        formData.append("sub_category",data.sub_category.toString())
        formData.append("price",data.price.toString())
        formData.append("discount",data.discount.toString())
        data.images.forEach((file) => {
            formData.append(`images[]`, file); // Ensuring unique key names
        });
        const response = await apiInstance.post(productRoutes['createNewProduct'],formData) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error)
    }
}

export  const manageProduct = async (data:IManageProduct) => {
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
            response  =  await apiInstance.post(productRoutes['updateProduct'],formData) as AxiosResponse;
        }else  
            response  =  await apiInstance.post(productRoutes['updateProduct'],{...data}) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error)
    }
}

export  const getAllProducts = async () => {
    try {
        const response = await apiInstance.post(productRoutes['getAllProducts']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return  handleCatchErrorsOfApi(error)
    }
}
