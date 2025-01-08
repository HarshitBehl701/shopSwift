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

export  const  fetchAllSubCategories  = async ()  => {
    try{
        const response  = await fetchAllCategories();

        if(response.length >  0){
            const subCategory = [];
            response.forEach((item) =>
            item.subCategory.forEach((subitem) =>
                subCategory.push(`${subitem.name}-${item.name}`)
            )
            );

            return subCategory;
        }   

        return [];

    }catch(error){
        return  [];
    }
}