import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUserContext } from "@/contexts/userContext";
import UpdatePhoto from "@/components/customComponents/UpdatePhoto";
import EditUserAccount from "@/components/customComponents/EditUserAccount";
import { useEffect, useState } from "react";
import { IOrderModal } from "@/interfaces/commonInterfaces";
import OrdersListTable from "@/components/customComponents/OrdersListTable";

export default function UserDashboard() {
  const {userData,userOrders} = useUserContext();
  const [filteredOrders,setFilteredOrders] = useState<IOrderModal[]  |  null>(null);
  useEffect(() => {
    if(filteredOrders===   null  &&  Array.isArray(userOrders) &&  userOrders.length  >0)
      setFilteredOrders(userOrders.slice(0,5));
    else if(filteredOrders===   null)
        setFilteredOrders([]);
  },[filteredOrders,userOrders]);
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* User Details Section */}
      <Card>
        <CardContent className="p-6 flex gap-6 items-center">
          {/* Left Side - User Image */}
          <UpdatePhoto />
          
          {/* Right Side - User Details */}
          <div className="flex-1 space-y-2">
            <h2 className="text-xl font-semibold capitalize">{userData?.user_name}</h2>
            <p className="text-gray-500"><span className="font-semibold">Email : </span>{userData?.email}</p>
            <p className="text-gray-500"><span className="font-semibold">Address  : </span>{userData?.address}</p>
            <EditUserAccount />
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders Section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          {Array.isArray(userOrders)  && userOrders.length  > 0 && <Separator />}
          <OrdersListTable  filteredOrders={filteredOrders} />
        </CardContent>
      </Card>
    </div>
  );
}