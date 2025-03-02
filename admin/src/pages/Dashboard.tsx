import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import React from "react";
import { useAdminContext } from "@/contexts/userContext";
import { ToastContainer } from "react-toastify";
import { formatDate } from "@/utils/commonUtils";
import Popup from "@/components/myComponents/Popup";
import UpdateAdmin from "@/components/myComponents/UpdateAdmin";
import { IAdminModal } from "@/interfaces/commonInterfaces";

export default function Dashboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const  {adminData} = useAdminContext();
  return (
       <>
        <div>
        <h1 className="capitalize text-2xl mb-4 font-semibold italic">Welcome Back Admin!</h1>
        <div className="">
        {/* Main Section */}
        <Card className="flex flex-col md:flex-row gap-6 p-6 items-center shadow-none md:items-start border-0">
          {/* Left */}
          <div  className="flex  flex-col md:flex-row   gap-6  items-center w-full border p-3   rounded-lg shadow-sm  border-gray-300">
          {/* Left: Profile Image */}
            <div className="w-32 h-32">
              <Avatar className="w-full h-full rounded-full overflow-hidden">
                <AvatarImage src="/logo.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>

            {/* Right: User Details */}
            <div className="flex-1 space-y-1">
              <h2 className="text-2xl font-semibold capitalize">{adminData?.admin_name}</h2>
              <p className="text-gray-600">Email: {adminData?.admin_email}</p>
              <p className="text-gray-600">Joined On: {adminData?.created_at ? formatDate(adminData?.created_at) : ""}</p>
              <Popup  buttonText="Edit Profile">
                <UpdateAdmin userData={(adminData as  IAdminModal)} />
              </Popup>
             {!adminData?.admin_email.includes(import.meta.env.VITE_ADMIN_EMAIL) && <Button variant={"link"}  className="text-red-500  text-xs">Deactivate Account</Button>}
            </div>
          </div>

          {/* Right: User Details */}
          <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border  w-fit  border-gray-300    shadow-sm"
          />
        </Card>
      </div>
      </div>
      <ToastContainer  />
       </>
  );
}
