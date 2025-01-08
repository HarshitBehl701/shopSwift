import { getUserCartWhislist } from "../api/user";
import { getLocalStorageVariables } from "./commonHelper";
import { updateUserWhislist, manageCart } from "../api/user";
import { getUser } from "../api/user";
import EditUserProfile from "../components/EditUserProfile";
import UserCartWhislistOrderList from "../components/UserCartWhislistOrderList";
import ManageOrders from "../components/ManageOrders";
import ManageProduct from "../components/ManageProduct";
import ProductList from "../components/ProductList";
import ProductDetailSeller from "../components/ProductDetailSeller";
import ProductDetailUser from "../components/ProductDetailUser";
import UserProfile from "../components/UserProfile";
import  {getOrder, getOrders, placeOrder}  from "../api/order";
import { fetchAllSellerProducts,fetchSellerAllOrders } from "./productHelpers";

export const fetchUserData = async () => {
  const [token, userType] = getLocalStorageVariables("all");
  try {
    const response = await getUser(token, userType);

    if (!response.status)
      return { status: false, message: "Some Unexpected Error Occured" };

    return {
      status: true,
      message: "User  Data  Fetched  Successfully",
      data: response.data,
    };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const fetchUserCartWhislistData = async () => {
  try {
    const [token, userType] = getLocalStorageVariables("all");
    const response = await getUserCartWhislist(token, userType);

    if (!response.status)
      return { status: false, message: "Some Unexpected  Error  Occured" };

    return {status: true,message:   "User Cart Or  Whislist  Found  Successfully",data:response.data};;
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const fetchUserOrdersData  = async () => {
  try{
    const [token, userType] = getLocalStorageVariables("all");
    const response = await getOrders(token, userType);

    if (!response.status)
      return { status: false, message: "Some Unexpected  Error  Occured" };

    return {status: true,message:   "Orders  Found  Successfully",data:response.data};
  }catch(error){
    return {status:  false,message:  error.message}
  }
}

export  const fetchUserOrderData =   async (orderId)  => {
  try{
    const [token, userType] = getLocalStorageVariables("all");
    const response = await getOrder(token, userType,orderId);

    if (!response.status)
      return { status: false, message: "Some Unexpected  Error  Occured" };

    return {status: true,message:   "Order  Found  Successfully",data:response.data};
  }catch(error){
    return {status:  false,message:  error.message}
  }
}

export const handleUserCartOrWhislist = async (
  cartOrWhislist,
  currentState,
  updateCurrentStateFn,
  productId
) => {
  const [token, userType] = getLocalStorageVariables("all");

  const requestApiNames = {
    whislist: updateUserWhislist,
    cart: manageCart,
  };

  if (!token || !userType)
    return { status: false, message: "Please Login  First" };
  else if (userType !== "user" || !requestApiNames[cartOrWhislist])
    return {
      status: false,
      message: "Something  Went  Wrong  Please  Try Again  Later",
    };

  try {
    const response = await requestApiNames[cartOrWhislist](token, userType, {
      productId: productId,
      type: currentState === false ? "add" : "remove",
    });

    if (!response.status)
      return {
        status: false,
        message: "Something  Went  Wrong  Please  Try Again  Later",
      };

    updateCurrentStateFn((prevStatus) => (prevStatus ? "added" : "not_added"));

    return { status: true, message: "Succesfully  Updated Data" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const manageUserAdminPageData = async (user,setUser,productId_or_orderId,action) => {
  const currentUser = getLocalStorageVariables("userType");

  const fieldsAsPerUsers = {
    user: ["name", "email", "address", "contact", "profile"],
    seller: [
      "fullname",
      "email",
      "address",
      "contact",
      "brandname",
      "brandLogo",
      "gstin",
    ],
  };

  if (!fieldsAsPerUsers[currentUser])
    return { status: false, message: "Something Went Wrong" };

  const currentFieldAsPerUser = fieldsAsPerUsers[currentUser];

  const defaultObj = currentFieldAsPerUser.reduce((acc, curr) => {
    acc[curr] = "";
    return acc;
  }, {});

  setUser(defaultObj);

  const userData = await fetchUserData();

  if (!userData.status) return { status: false, message: "User Not Found" };

  setUser(userData.data);

  const requestedPagesAsPerUserType = {
    common: {
      profile: <UserProfile userData={user} />,
      edit_profile: <EditUserProfile userData={user} />,
    },
    user: {
      cart: <UserCartWhislistOrderList currentPage={"Cart"} />,
      orders: <UserCartWhislistOrderList currentPage={"Orders"} />,
      whislist: <UserCartWhislistOrderList currentPage={"Whislist"} />,
    },
    seller: {
      add_product: <ManageProduct action={"add_product"} />,
      all_products: (
        <ProductList title={"All Products"} type={"all_products"} />
      ),
      live_products: (
        <ProductList title={"Live Products"} type={"live_products"} />
      ),
      manage_orders: (
        <ProductList title={"Manage Products"} type={"manage_orders"} />
      ),
    },
    specialPage: {
      seller: {
        product: <ProductDetailSeller productId={productId_or_orderId} />,
        edit_product: <ManageProduct action={"edit_product"} />,
        order_detail: <ManageOrders orderId={productId_or_orderId} />,
      },
      user: {
        product_detail: <ProductDetailUser productId={productId_or_orderId} />,
        order_detail: <ManageOrders orderId={productId_or_orderId} />,
      },
    },
  };

  let allowedRequestedPages = Object.assign(
    {},
    requestedPagesAsPerUserType["common"],
    requestedPagesAsPerUserType[currentUser]
  );

  allowedRequestedPages = productId_or_orderId
    ? Object.assign({}, allowedRequestedPages, {
        special: requestedPagesAsPerUserType["specialPage"][currentUser],
      })
    : allowedRequestedPages;

  const menuOptions = Object.keys(allowedRequestedPages).filter(
    (option) => option != "special"
  );

  let requestPage = allowedRequestedPages["profile"];

  if (action in allowedRequestedPages)
    requestPage = allowedRequestedPages[action];
  else if (
    productId_or_orderId &&
    "special" in allowedRequestedPages &&
    action in allowedRequestedPages["special"]
  )
    requestPage = allowedRequestedPages["special"][action];

    return {status:true, message: "Process Completed Successfully",data: {currentUser:currentUser,menuOptions:menuOptions,requestPage:requestPage}}

};

export  const manageUserProfilePageData = async () => {
  const currentUser = getLocalStorageVariables('userType');
  const userDataResponse  = await  fetchUserData();

  if(!userDataResponse.status){
    return {status:false,message: "An Unexpected error  Occured"};
  }

  const userData = userDataResponse.data;

    const fieldsAsPerUser = {
      user: ["name", "email", "address", "contact", "picture"],
      seller: [
        "fullname",
        "email",
        "address",
        "contact",
        "brandname",
        "brandLogo",
        "gstin",
      ],
    };
  
    const currentFieldAsCurrentUser = fieldsAsPerUser[currentUser];
  
    const newUserData = currentFieldAsCurrentUser.reduce((acc, curr) => {
      acc[curr] = userData[curr] || "";
      return acc;
    }, {});

    const imageSrc = newUserData.picture || newUserData.brandLogo;

    return {status:true,message: "Page Progress Completed",data:{imageSrc:imageSrc,currentFieldAsCurrentUser:currentFieldAsCurrentUser,currentUser:currentUser,userData:newUserData}};
}

export const manageUserEditProfilePageData  = async  () => {

  const userDataResponse  = await fetchUserData();

  if(!userDataResponse)
    return {status: false,message: "Some Unexpected  Error Occured Please  Try Again Later"};

  const  userData = userDataResponse.data;

   const currentUser = getLocalStorageVariables("userType");
  
    const fieldsAsPerUsers = {
      user: ["name", "email", "address", "contact"],
      seller: ["fullname", "email", "address", "contact", "brandname", "gstin"],
    };
  
    const currentFieldAsPerUser = fieldsAsPerUsers[currentUser];
    
    const defaultFormObj = currentFieldAsPerUser.reduce((acc, curr) => {
      acc[curr] = "";
      return acc;
    }, {});

    const newUserData = currentFieldAsPerUser.reduce((acc, curr) => {
      acc[curr] = userData[curr] || "";
      return acc;
    }, {});
  
    const imageSrc = userData.picture || userData.brandLogo;
 
    return {status: true, message: "Page Progress Completed Succeessfully",data: {defaultFormObj:defaultFormObj,userData:newUserData,imageSrc: imageSrc,currentFieldAsPerUser:currentFieldAsPerUser,currentUser: currentUser}}  
}


export  const manageUserPlacingOrderOrAddingToCart  = async (action,productId)  =>{

  try{

    const  [token,userType]  = getLocalStorageVariables('all');
    
    const  allowedActions  =  {
      order: placeOrder,
      cart: manageCart
    }

    const additionalData = {
      order: {quantity: 1},
      cart: {type:  'add'}
    }

    if(!allowedActions[action])
      return {status:false,messge:  "Something  went wrong please  try  again later"}

    const  data = {productId:productId,...additionalData[action]};

    const response   = await allowedActions[action](token,userType,data);
    
    if(!response.status)
      return {status:false,messge:  response.message}

    return {status:  true,message: 'successfully completed the  task'};

  }catch(error){
    return  {status:false,message: error.messge};
  }

}

export const  manageSellerProductsAndOrdersListDataForAdminpage  =  async  (type)  =>{
try{
const response = (type  !==  'manage_orders')  ?  await fetchAllSellerProducts(type) : await fetchSellerAllOrders();

if(!response.status)
  return  {status:false,message:   response.message};
else{
  return {status: true,message: "Resource  Found  Successfully",data: response.data};
}

}catch(error){
  return  {status:false,message: error.message}
}
}