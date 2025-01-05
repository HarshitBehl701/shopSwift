import axios from 'axios';

export const  getUser = async (token,userType) => {
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/${userType}/get-user`,{},{
            headers: {
                Authorization:  `Bearer ${token}`,
                'X-User-Type': userType,
            }
        });
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

export const  getUserCartWhislist = async (token,userType) => {
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/${userType}/get-user-cart-whislist`,{},{
            headers: {
                Authorization:  `Bearer ${token}`,  
                'X-User-Type': userType,
            }
        });
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

export const  updateUser = async (token,data,userType) => {
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/${userType}/update-user`,{...data},{
            headers: {
                Authorization:  `Bearer ${token}`
            }
        });
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

export const profilePicUpload  = async (token,data,userType) => {
    try{
        const formData = new FormData();
        formData.append('profilePic', data);
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/${userType}/upload-photo`,formData,{
            headers: {
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

export  const manageCart =  async  (token,userType,data) =>  {
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/${userType}/manage-cart`,data,{
            headers: {
                Authorization:  `Bearer ${token}`,
                'X-User-Type': userType,
            }
        });
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

export const updateUserWhislist = async  (token,userType,data) => {
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/${userType}/manage-wishlist`,data,{
            headers: {
                Authorization:  `Bearer ${token}`,
                'X-User-Type': userType,
            }
        });
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : new Error('Network Error');
    }
}