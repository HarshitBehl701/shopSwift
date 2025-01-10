import {fetchSpecificProductCategory,fetchSpecificMinViewsProducts,fetchSpecificRatingProducts} from  "./productHelpers"


export  const  mainPageHelper = async  ()  =>{
    const clothingCategoryProducts  = await fetchSpecificProductCategory("clothing",5);

    const minViewsProducts =  await fetchSpecificMinViewsProducts(20,5);

    return [
        {heading:"Top  Views Products",data: minViewsProducts},
        {heading:"Explore New Styles",data: clothingCategoryProducts},
    ]

}