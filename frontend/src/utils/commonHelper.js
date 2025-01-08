import   {profilePicUpload} from "../api/user"
import { fetchAllProducts } from "../utils/productHelpers";
import { fetchAllCategories } from "../utils/categoryHelpers";
import { fetchAllSubCategories } from "../utils/categoryHelpers";
import  {changeStatusProduct} from  "../api/product"

export  const isEmptyObject = (obj) =>   {
    return  Object.values(obj).some((value) =>   {
        return value === null ||  value === undefined ||    value ===  ''
    })
}

export const  getLocalStorageVariables = (action)  => {
    if(action   ===  'all'){
        return [localStorage.getItem('token'),localStorage.getItem('userType')];
    }
    return  localStorage.getItem(action);
}

export  const setLocalStorageVariables  = (keysValuesObj)  =>{
    for(let key in keysValuesObj){
        localStorage.setItem(key,keysValuesObj[key]);
    }
}

export const removeLocalStorageVariables  =  (action) => {
    if(action == 'all')
    {
      localStorage.removeItem('token')
      localStorage.removeItem('userType')
    }else{
      localStorage.removeItem(action);
    }
}

export const handlePicUploadFn = async (e) => {
    const [token,currentUser] =  getLocalStorageVariables('all');
    e.preventDefault();
    const file = e.target.files[0];
    const type = file.type.split("/")[1].toLowerCase();
    const allowedExtension = ["jpeg", "jpg", "png"];
    if (allowedExtension.indexOf(type) == -1)
      return {status: false, message: "Please  Upload  A Valid  Image  only : jpg , jpeg, png"}
    else if (file.size > 2097152) return {status:  false,message: "File  Size Must be under 2 MB"}
    else {
      try {
        const response = await profilePicUpload(
          token,
          file,
          currentUser
        );

        if(!response.status)
            return  {status: false,message: 'Some  Unexpected  Error  Occured'};

        return  {status: true,message: "Uploaded Profile Photo  Successfully"};

      } catch (error) {
        return {status: false,message: error.message}
      }
    }
}

export  const  handleSearchLogic  =  async (searchQuery) =>  {
  const productsResponseData = await fetchAllProducts();
  const categoriesResponseData  =  await fetchAllCategories();
  const subCategoriesResponseData   =  await fetchAllSubCategories();

  const products = productsResponseData.map((data) => ({name: data.name,link:`/product/${data.productId}`}));
  const categories = categoriesResponseData.map((data) => ({name:  data.name,link:`/products/${data.name}`}));
  const subCategories  = subCategoriesResponseData.map((data) => ({name: data,link: `/products/${data.split('-')[1]}/${data.split('-')[0]}`}));

  const  searchData = [...products,...categories,...subCategories];

  const filteredResults = searchData.filter((item) =>
  {
    if(item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())) return item;
  }
  );

  return  filteredResults;

}

export const handleSellerProductActiveAndInactiveStatus = async (productId,currentStatus)  => {
  try{
    const [token,userType] = getLocalStorageVariables('all');
    const response  =  await changeStatusProduct(token,userType,{productId:productId,currentStatus:(currentStatus.toLowerCase() == 'active') ? 1  : 0});
    
  if(!response.status)
    return  {status: true,message: response.message};
  
  return {status:true,message: "Product  Status Updated  Successfully"}
  }catch(error){
    return {status:false,message:  error.message};
  }
}