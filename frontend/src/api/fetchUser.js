import axios from 'axios';

export const  fetchUser = async (token,userType) => {
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