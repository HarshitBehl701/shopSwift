import {categories} from "../api/category";

export const fetchAllCategories =  async () =>  {
    try{
        const  response =  await  categories();
        if(!response.status) return  [];
        return  response.data;
    }catch(error){
        return  [];
    }
}