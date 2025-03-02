import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useMemo } from "react";
import ProfileBtnDropDown from "./ProfileBtnDropDown";
import { useUserContext } from "@/contexts/userContext";

export default function Navbar() {
  const {isLoggedIn} = useUserContext();
  const menus:string[] = useMemo(() => ['Home','Shop','Contact','Login','Register'],[]);
  return (
    <nav className="flex items-center sticky   top-0 z-30 justify-between p-4 md:px-8 shadow-md bg-white">
      {/* Logo and Brand Name */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Brand Logo" className="h-10 w-18 rounded-md object-cover object-center" />
        <span className="text-xl font-bold">ShopSwift</span>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-sm font-semibold items-center">
        {menus.map((menu) => (isLoggedIn &&  (menu.includes("Login") || menu.includes("Register"))) ? null : <Link to={`/${menu.toLowerCase()}`} className="hover:text-white  py-1 px-2 rounded-md cursor-pointer hover:bg-[#5966ff]"  key={menu}>{menu}</Link>)}
        {isLoggedIn && <ProfileBtnDropDown />}
      </div>
      {/* Mobile Menu */}
      <div className="md:hidden flex  items-center justify-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 mt-4 cursor-pointer">
              {menus.map((menu) => (isLoggedIn &&  (menu.includes("Login") || menu.includes("Register"))) ? null : <Link to={`/${menu.toLowerCase()}`} className="text-lg hover:bg-[#5966ff] rounded-md p-3 hover:text-white font-semibold" key={menu}>{menu}</Link>)}
            </div>
          </SheetContent>
        </Sheet>
        {isLoggedIn && <ProfileBtnDropDown />}
      </div>
    </nav>
  );
}