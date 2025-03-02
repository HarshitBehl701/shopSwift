import { useLocation, useParams, useSearchParams } from "react-router-dom"
import { Card} from "../components/ui/card";
import { IAdminModal, ISellerModal, IUserModal } from "@/interfaces/commonInterfaces";
import { formatDate, getImagePathUrl, handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { useEffect, useState } from "react";
import { getUserDetails } from "@/api/userApi";
import { getSellerDetails } from "@/api/sellerApi";
import { getAdminDetails } from "@/api/adminApi";
import { IGetAdminDetailsResponse, IGetSellerDetailsResponse, IGetUserDetailsResponse } from "@/interfaces/apiInterfaces";
import ManageUser from "@/components/myComponents/ManageUser";
import UpdatePhoto from "@/components/myComponents/UpdatePhoto";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function UserDetail() {
  const  {userType} = useParams();
  const [searchParams] = useSearchParams();
  const  [userData,setUserData] = useState((useLocation().state as ISellerModal | IUserModal  | IAdminModal) || null)
  const userId = searchParams.get('id');

  useEffect(() => {
    if(userData ===  null &&  userId)
    {
      ;(async () => {
          try {
            const response  = userType?.includes("user") ? await getUserDetails({user_id:parseInt(userId)}) : (userType?.includes("seller") ?  await getSellerDetails({seller_id:parseInt(userId)})  : (userType?.includes("admin") ? await  getAdminDetails({admin_id:parseInt(userId)}) :  null));
            if(response !== null)
            {
              if(response.status  &&  response.data)
              {
                if(userType?.includes("user")) 
                  setUserData((response.data  as  IGetUserDetailsResponse).userData);
                else if(userType?.includes("seller"))
                  setUserData((response.data  as IGetSellerDetailsResponse).sellerData);
                else if(userType?.includes("admin"))
                  setUserData((response.data  as IGetAdminDetailsResponse).adminData);
              }else{
                handleToastPopup({message:(response.message),type:"error"});
              }
            }
          } catch (error) {
            handleToastPopup({message:handleCatchErrors(error),type:"error"});
          }
      })()
    }
  },[userData,userType,userId]);

  return (
    <>
    {userData && 
      <div>
        <div className="">
        {/* Main Section */}
        <Card className="flex flex-col md:flex-row gap-6 p-6 items-center md:items-start">
          {/* Left: Profile Image */}
          {userType?.includes('admin')  ?
            <Avatar className="w-32 h-32">
              <AvatarImage
                src={getImagePathUrl("main","logo.png")}
                alt="User"
              />
              <AvatarFallback>
                <img
                  src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg"
                  alt="Fallback Avatar"
                />
              </AvatarFallback>
            </Avatar>
            :
            <UpdatePhoto userType={userType}  userData={userData} />
          }

          {/* Right: User Details */}
          <div className="flex-1 space-y-1">
            <h2 className="text-2xl font-semibold capitalize">{userType?.includes("seller") ? (userData as  ISellerModal).brand_name : (userType?.includes("admin") ?  (userData  as  IAdminModal).admin_name : (userType?.includes('user')  ? (userData  as IUserModal).user_name :  ''))}</h2>
            <p className="text-gray-600">Email: {userType?.includes("seller") ? (userData as  ISellerModal).email : (userType?.includes("admin") ?  (userData  as  IAdminModal).admin_email : (userType?.includes('user')  ? (userData  as IUserModal).email :  ''))}</p>
            <p className="text-gray-600">Joined on: {formatDate(userData.created_at)}</p>
            <ManageUser  userType={userType} userData={userData} setUserData={setUserData} />
          </div>
        </Card>
        {/* Bottom Section */}
        <Card className="mt-6 p-6">
          <h3 className="text-xl font-semibold">Additional Information</h3>
          {userType?.includes("seller") &&  
            <>
            <p className="text-gray-600">Seller ID: {(userData as ISellerModal).id}</p> 
            <p className="text-gray-600">Owner Name: {(userData as ISellerModal).seller_name}</p> 
            <p className="text-gray-600">GSTIN: {(userData as ISellerModal).gstin}</p> 
            <p className="text-gray-600">Is Verified: {(userData as ISellerModal).is_verified}</p> 
            <p className="text-gray-600">Verification Code: {(userData as ISellerModal).verification_code}</p> 
            <p className="text-gray-600">Verification Expiration: {formatDate((userData as ISellerModal).verification_expiration)}</p> 
            <p className="text-gray-600">Last  Profile Changes: {formatDate((userData as ISellerModal).updated_at)}</p> 
            </>
          }
          {userType?.includes("user") &&  
            <>
            <p className="text-gray-600">User ID: {(userData as IUserModal).id}</p> 
            <p className="text-gray-600">User Address: {(userData as IUserModal).address}</p> 
            <p className="text-gray-600">Is Verified: {(userData as IUserModal).is_verified}</p> 
            <p className="text-gray-600">Verification Code: {(userData as IUserModal).verification_code}</p> 
            <p className="text-gray-600">Verification Expiration: {formatDate((userData as IUserModal).verification_expiration)}</p> 
            <p className="text-gray-600">Last  Profile Changes: {formatDate((userData as IUserModal).updated_at)}</p> 
            </>
          }
          {userType?.includes("admin") &&  
            <>
            <p className="text-gray-600">Last  Profile Changes: {formatDate((userData as IAdminModal).updated_at)}</p> 
            </>
          }
          <p className="text-gray-600">Status: {userData.is_active ? 'Active' :  "In-Active"}</p>
        </Card>
      </div>
      </div>
    }
    {userData  === null &&  <p className="italic">No user data found</p>}
    </>
  )
}

export default UserDetail