import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/get_products`
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export  const getFilteredProducts   = async  (condition,limit) =>{
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/get_filtered_products`,{condition:condition,limit:limit}
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
}

export const createProduct = async (token, userType, data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);
    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("description", data.description);

    data.files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/create-product`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          "X-User-Type": userType,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getSellerProducts = async (token, userType, type, data = {}) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/get_seller_products/${type}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-User-Type": userType,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export  const  getSellerAllOrders = async  (token,userType) =>  {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/get_seller_orders`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-User-Type": userType,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
}

export const changeStatusProduct = async (token, userType, data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/change-status-product`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-User-Type": userType,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getProductDetail = async (productId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/get_product/${productId}`
    );

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const updateProductView = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/update-product-view`,
      data
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const updateProductRating = async (token, userType, data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/update-product-rating`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-User-Type": userType,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const editProduct = async (token,userType,productId,data) => {
  try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);
      formData.append("price", data.price);
      formData.append("discount", data.discount);
      formData.append("description", data.description);
      formData.append("deleteFiles",JSON.stringify(data.deletefiles))

      data.files.forEach((file) => {
        formData.append("files", file)
      });
    

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/edit_product/${productId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          "X-User-Type": userType,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Networks Error");
  }
}

export const changeCommentStatus  = async  (token,userType,productId,orderId,status,commentId)  =>  {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/comment/comment-status-update/${productId}/${orderId}`,
      {status:status,commentId:commentId},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-User-Type": userType,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
}