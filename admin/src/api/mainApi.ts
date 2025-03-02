import { ICreateNewCategory, ICreateNewSubCategory, IUpdateCategory, IUpdateSubCategory } from "@/interfaces/apiInterfaces";
import { axiosInstance, handleApiResponse, mainRoutes } from "@/utils/apiUtils";
import { handleCatchErrorsOfApi } from "@/utils/commonUtils";
import { AxiosResponse } from "axios";
const apiInstance = axiosInstance('main');

export  const createNewCategory = async   (data:ICreateNewCategory) => {
    try {

        const   formData =  new FormData();
        if(data.image)
        {
            formData.append("image",data.image)
        }

        const   dataObj:Record<string,unknown> = {...formData};
        
        if(data.name)
            dataObj.name = data.name

        const response = await apiInstance.post(mainRoutes['createNewCategory'],dataObj) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const manageCategory = async   (data:IUpdateCategory) => {
    try {  
        const   formData =  new FormData();
        formData.append("category_id",data.category_id.toString());

        if(data.image)
        {
            formData.append("image",data.image)
        }

        if(data.is_active)
            formData.append("is_active",data.is_active.toString())
        
        if(data.name)
            formData.append("name",data.name) ;
        
        const response = await apiInstance.post(mainRoutes['manageCategory'],formData) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const createNewSubCategory = async   (data:ICreateNewSubCategory) => {
    try {
        const   formData =  new FormData();
        if(data.image)
        {
            formData.append("image",data.image)
        }

        const   dataObj:Record<string,unknown> = {...formData,category_id:data.category_id};

        if(data.sub_category_name)
            dataObj.is_active =data.sub_category_name
        

        const response = await apiInstance.post(mainRoutes['createNewSubCategory'],dataObj) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const manageSubCategory = async   (data:IUpdateSubCategory) => {
    try {
        const   formData =  new FormData();
        if(data.category_id)
            formData.append("category_id",data.category_id?.toString());
        formData.append("sub_category_id",data.sub_category_id?.toString());


        if(data.image)
        {
            formData.append("image",data.image)
        }

        if(data.is_active)
            formData.append("is_active",data.is_active.toString());
        
        if(data.sub_category_name)
            formData.append("sub_category_name",data.sub_category_name);

        const response = await apiInstance.post(mainRoutes['manageSubCategory'],formData) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const getAllActiveCategoriesSubCategories = async   () => {
    try {
        const response = await apiInstance.post(mainRoutes['getAllCategoriesSubCategories']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}

export  const getAllCategoriesSubCategories = async   () => {
    try {
        const response = await apiInstance.post(mainRoutes['getAllCategoriesSubCategories']) as AxiosResponse;
        return   handleApiResponse(response);
    } catch (error) {
        return handleCatchErrorsOfApi(error);
    }
}