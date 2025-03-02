import BaseLayout from "./BaseLayout"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, LogOutIcon, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/contexts/userContext";

function DashboardLayout({children}:{children:React.ReactNode}) {
  const navigate = useNavigate();
  const  {userData} = useUserContext();
  return (
    <BaseLayout>
        <div className="flex min-h-screen w-[90%]  mx-auto my-12">
        {/* Sidebar */}
        <Card className="w-1/4 p-4 flex flex-col rounded-none space-y-4 border-r">
        <h1  className="text-2xl font-semibold">User Dashboard</h1>
          <Button variant="ghost" onClick={() =>  navigate(`/${encodeURIComponent(userData?.user_name?.toLowerCase() ??  '')}/dashboard`)}  className="justify-start cursor-pointer">
            <User className="w-5 h-5 mr-2" /> Profile
          </Button>
          <Button variant="ghost" onClick={() =>  navigate(`/${encodeURIComponent(userData?.user_name?.toLowerCase() ??  '')}/orders`)} className="justify-start cursor-pointer">
            <ShoppingBag className="w-5 h-5 mr-2" /> Orders
          </Button>
          <Button variant="ghost" onClick={() =>  navigate(`/${encodeURIComponent(userData?.user_name?.toLowerCase() ??  '')}/cart`)} className="justify-start cursor-pointer">
            <ShoppingCart className="w-5 h-5 mr-2" /> Cart
          </Button>
          <Button variant="ghost" onClick={() =>  navigate(`/${encodeURIComponent(userData?.user_name?.toLowerCase() ??  '')}/whislist`)} className="justify-start cursor-pointer">
            <Heart className="w-5 h-5 mr-2" /> Whislist
          </Button>
          <Button variant="ghost" onClick={() =>  navigate('/logout')} className="justify-start hover:bg-red-500  hover:text-white text-red-400 cursor-pointer">
            <LogOutIcon className="w-5 h-5 mr-2" /> Logout
          </Button>
        </Card>

        {/* Main Content Area */}
        <div className="flex-1 border  border-gray-300">
          {children}
        </div>
    </div>
    </BaseLayout>
  )
}

export default DashboardLayout