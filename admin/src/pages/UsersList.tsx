import { useParams } from "react-router-dom"
import CustomTable from "../components/myComponents/CustomTable";
import { ICustomTable } from "../interfaces/componentsInterface";
import { useEffect, useMemo, useState } from "react";
import { IAdminModal, ISellerModal, IUserModal } from "@/interfaces/commonInterfaces";
import { handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { getAllUsers } from "@/api/userApi";
import { IGetAllAdminsResponseData, IGetAllSellersResponseData, IGetAllUsersResponseData } from "@/interfaces/apiInterfaces";
import { getAllAdmins } from "@/api/adminApi";
import { getAllSellers } from "@/api/sellerApi";

function UsersList() {
    const  {userType}  =  useParams();
    const [listData,setListData] = useState<IUserModal[] | ISellerModal[] | IAdminModal[] |  null>(null);
    const [currentUser,setCurrentUser] = useState<string>("");

    const tableHeaders:Array<string> | null = useMemo(() => {
      if(userType?.toLowerCase() === "users")
          return ['User ID','Name','Email','Joined on','Is Verified','Status'];
      else if(userType?.toLowerCase().includes("sellers"))
          return ['Seller ID','Brand Name','Owner','Email','Joined on','Is Verified','Status'];
      else if(userType?.toLowerCase().includes("admins"))
          return ['Name','Email','Joined on','Status'];
      return   null;
    },[userType]);

    const tableColumns:Array<keyof IUserModal |  keyof ISellerModal |  keyof IAdminModal> | null= useMemo(() => {
      if(userType?.toLowerCase().includes('users'))
        return  ['id','user_name','email','created_at','is_verified','is_active'];
      else  if(userType?.toLowerCase().includes('sellers'))
        return  ['id','brand_name','seller_name','email','created_at','is_verified','is_active'];
      else  if(userType?.toLowerCase().includes('admins'))
        return  ['admin_name','admin_email','created_at','is_active'];
      return null
    },[userType]);

    const tableData:ICustomTable | null = useMemo(() =>  {
      if(userType && Array.isArray(tableHeaders) && Array.isArray(listData) &&  Array.isArray(tableColumns))
      {
        return {
          title: userType+" List",
          currentPage:"Users",
          headings:  tableHeaders,
          columns:   tableColumns,
          rowsData: listData,
          editActionRequired:  true,
          editActionRedirectUrl: `/${(userType.toLowerCase().includes('users')) ?  'user'  : (userType.toLowerCase().includes('sellers') ?  'seller' : (userType.toLowerCase().includes('admins')) ?  "admin" : "")}/`,
          isColumnIncludedInRedirectUrl: true,
          columnNameOfRedirectUrl: (userType.toLowerCase().includes('users')) ?  'user_name'  : (userType.toLowerCase().includes('sellers') ?  'seller_name' : (userType.toLowerCase().includes('admins')) ?  "admin_name" : ""),
          isSearchParamInRedirecdtUrl:true,
          searchParams:  `id`
        }
      }
      return  null;
    },[userType,listData,tableColumns,tableHeaders]); 

    useEffect(() =>{
      const reqUsersApiFunctions =  {
        'users' : getAllUsers,
        'admins':  getAllAdmins,
        'sellers':  getAllSellers,
      }

      if(currentUser.toLowerCase() !== userType?.toLowerCase() && typeof  userType  === 'string' && userType in reqUsersApiFunctions)
      {
        ;(async() => {
          try {
            const response   = await reqUsersApiFunctions[userType as keyof typeof reqUsersApiFunctions]();
            if(response.status &&  response.data)
            {
              const responseData =    response.data; 
              if(userType ==  'admins')
                setListData((responseData as   IGetAllAdminsResponseData).admins);
              else if(userType ==  'users')
                setListData((responseData as   IGetAllUsersResponseData).users);
              else if(userType ==  'sellers')
                setListData((responseData as   IGetAllSellersResponseData).sellers);
                
              setCurrentUser(userType);
            }else{
              handleToastPopup({message:(response.message),type:"error"});
            }

          } catch (error) {
            handleToastPopup({message:handleCatchErrors(error),type:'error'});
          }
        })()
      }
    },[currentUser,setCurrentUser,setListData,userType]);

  return (
    <div>
        {tableData &&  <CustomTable tableData={tableData}   />}
        {(listData === null || listData?.length ==  0) && <p  className="italic">{`No ${userType} Found`}</p>}
    </div>
  )
}

export default UsersList