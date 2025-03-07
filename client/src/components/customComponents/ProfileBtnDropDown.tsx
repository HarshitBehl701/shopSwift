import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUserContext } from "@/contexts/userContext";
import { getImagePathUrl } from "@/utils/commonUtils";
import { Link } from "react-router-dom";
import { Dot } from "lucide-react";

const ProfileBtnDropDown = () => {
  const {userData} = useUserContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center space-x-2 text-gray-700">
      <Avatar  className="shadow-sm   border">
        <AvatarImage   className="object-cover" src={userData ? getImagePathUrl("user",userData.user_photo) : "https://github.com/shadcn.png"} />
        <AvatarFallback>
          <img  src="https://github.com/shadcn.png" />
        </AvatarFallback>
      </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        <DropdownMenuItem className="cursor-pointer"><Link to={`/${encodeURIComponent(userData?.user_name?.toLowerCase() ?? '')}/dashboard`} className="w-full">My Dashboard</Link></DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer"><Link to={`/${encodeURIComponent(userData?.user_name?.toLowerCase() ?? '')}/cart`} className="w-full   flex items-center">Cart  {userData?.user_cart && userData?.user_cart !== ''  && <small><Dot className="stroke-red-500" /></small>}</Link></DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer"><Link to={`/${encodeURIComponent(userData?.user_name?.toLowerCase() ?? '')}/orders`} className="w-full">Orders</Link></DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer"><Link to={`/${encodeURIComponent(userData?.user_name?.toLowerCase() ?? '')}/whislist`} className="w-full">Whislist</Link></DropdownMenuItem>
        <DropdownMenuItem className="p-0"><Link to={'/logout'} className="text-red-500 pl-2 p-1 rounded-sm hover:bg-red-500  hover:text-white w-full cursor-pointer">Log Out</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileBtnDropDown;