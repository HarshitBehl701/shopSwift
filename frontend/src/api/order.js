import  axios from 'axios';

export  const placeOrder = async  (token,userType,data) =>  {
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/order/create-order`,data,{
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

export  const getOrders = async  (token,userType) =>  {
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/order/user-orders`,{},{
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

export  const getOrder = async  (token,userType,orderId) =>  {
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/order/user-order/${orderId}`,{},{
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