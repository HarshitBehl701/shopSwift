import { Card} from "../components/ui/card";
import { useUserContext } from "@/contexts/userContext";
import { formatDate } from "@/utils/commonUtils";
import EditProfile from "@/components/myComponents/EditProfile";
import UpdatePhoto from "@/components/myComponents/UpdatePhoto";
import Popup from "@/components/myComponents/Popup";

function Dashboard() {
  const   {userData} = useUserContext();
  return (
    <div>
        <div className="">
        {/* Main Section */}
        <Card className="flex flex-col md:flex-row gap-6 p-6 items-center md:items-start">
          {/* Left: Profile Image */}
          <UpdatePhoto />

          {/* Right: User Details */}
          <div className="flex-1 space-y-1">
            <h2 className="text-2xl font-semibold capitalize">{userData?.seller_name}</h2>
            <p className="text-gray-600">Email: {userData?.email}</p>
            <p className="text-gray-600">Joined on: {userData?.created_at &&  formatDate(userData?.created_at)}</p>
            <Popup buttonText="Edit Profile">
            <EditProfile />
            </Popup>
          </div>
        </Card>
        {/* Bottom Section */}
        <Card className="mt-6 p-6">
          <h3 className="text-xl font-semibold">Additional Information</h3>
            <p className="text-gray-600">Owner Name: {userData?.seller_name}</p> 
            <p className="text-gray-600">GSTIN: {userData?.gstin ?? "Please Update  Your  GSTIN Number"}</p> 
            <p className="text-gray-600">Last  Profile Changes: {userData?.updated_at &&  formatDate(userData?.updated_at)}</p> 
            <p className="text-gray-600">Status: {userData?.is_active ? 'Active' :  "In-Active"}</p>
        </Card>
      </div>
      </div>
  )
}

export default Dashboard