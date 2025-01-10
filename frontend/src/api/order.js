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

export  const updateOrderStatus  = async  (token,userType,orderId,newStatus) =>  {
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/order/seller-update-order-status/${orderId}`,{status:newStatus},{
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

export  const createComment = async  (token,userType,productId,orderId,comment) =>  {
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/comment/create-comment/${productId}/${orderId}`,{comment:comment},{
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

export  const updateRating = async   (token,userType,productId,orderId,rating)  =>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/order/update-rating/${productId}/${orderId}`,{rating:rating},{
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