import axios from 'axios';

export  const  getProducts =  async ()  => {
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/product/get_products`);
            return response.data;
        }catch(error){
            throw error.response ? error.response.data : new Error('Network Error');
        }
}

export const createProduct  =  async  (token,userType,data) => {
    try{        
        
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/product/create-product`,data,{
            headers:{
                Authorization:  `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
                'X-User-Type': userType,
            }
        });

        return response.data;
    }catch(error){
        throw error.response ? error.response.data : new Error('Network Error');
    }
}