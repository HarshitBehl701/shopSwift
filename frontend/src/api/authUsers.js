import axios from "axios";

export  const registerUser =   async  (data,userType) => {
    try{
        const  response  = await axios.post(`${process.env.REACT_APP_API_URL}/${userType}/register`,data);
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

export const loginUser  =  async (data,userType)   => {
    try{
        const response =  await   axios.post(`${process.env.REACT_APP_API_URL}/${userType}/login`,data);
        return response.data;
    }catch(error){
        throw error.response   ? error.response.data : new Error('Network Error');
    }
}