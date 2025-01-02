import  axios   from 'axios';

export  const categories = async  () => {
    try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/main/get_category`);
    
        return response.data;
      } catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
      }
}