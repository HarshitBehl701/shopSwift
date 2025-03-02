import { Menu, User } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
  } from "../ui/sheet";
import { LayoutDashboard, Users, LogOut, Network, ShoppingBag, ShoppingBasket } from "lucide-react";  
import DropDownMenu from "./DropDownMenu";
import { useMemo } from "react";
import { ISideNavbarDropDownMenu } from "../../interfaces/componentsInterface";
import { Button } from "../ui/button";
import { unsetLocalStorageVariables } from "@/utils/commonUtils";
import { DropdownMenu } from "../ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useAdminContext } from "@/contexts/userContext";
import { Link } from "react-router-dom";

function TopNavbar() {
  const  {adminData} = useAdminContext();

  const menus: ISideNavbarDropDownMenu[] = useMemo(() => (
    [
      {
        title: <><Network /> Category/SubCategory</>,
        subMenus: [
          { link: "/page/categories", title: "Categorie" },
          { link: "/page/subcategories", title: "SubCategorie" }
        ]
      },
      {
        title: <><ShoppingBag /> Orders</>,
        subMenus: [
          { link: "/orders", title: "All Orders" },
        ]
      },
      {
        title: <><ShoppingBasket /> Products</>,
        subMenus: [
          { link: "/products", title: "All Products" },
        ]
      },
      {
        title: <><Users /> Users</>,
        subMenus: [
          { link: "/users", title: "All Users" },
        ]
      },
      {
        title: <><Users /> Sellers</>,
        subMenus: [
          { link: "/sellers", title: "All Sellers" },
        ]
      },
      {
        title: <><Users /> Admins</>,
        subMenus: [
          { link: "/admins", title: "All Admins" },
        ]
      }
    ]
  ), []);


  return (
    <nav className="flex md:hidden items-center justify-between bg-gray-900 text-white p-4 shadow-md">
      <Sheet>
        <SheetTrigger><Menu className="mr-2" /></SheetTrigger>
        <SheetContent className="bg-white">
          <SheetHeader>
            <ul className="space-y-4">
              <li className="flex items-center hover:bg-gray-700 hover:text-white font-semibold rounded-md p-3 gap-2 cursor-pointer">
                <LayoutDashboard /> Dashboard
              </li>
              {menus.map((menu, index) => (
                <DropDownMenu key={index} title={menu.title}>
                  {menu.subMenus.map((subMenu, subIndex) => (
                    <li key={subIndex} className="hover:bg-gray-800  hover:text-white p-2 rounded-md cursor-pointer">
                      <a href={subMenu.link}>{subMenu.title}</a>
                    </li>
                  ))}
                </DropDownMenu>
              ))}
              <li className="flex items-center hover:bg-red-500 hover:text-white font-semibold rounded-md p-3 gap-2 cursor-pointer text-red-400">
              <Button className="bg-transparent shadow-none border-0" onClick={unsetLocalStorageVariables}><LogOut /> Logout</Button>
              </li>
            </ul>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <h1 className="te   xt-xl font-bold">Admin Panel</h1>
      <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <User />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white text-black p-3 shadow-md rounded-lg min-w-[180px]">
        <DropdownMenuLabel className="text-gray-700 font-semibold">{adminData?.admin_name}</DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem className="p-2 rounded-md hover:bg-gray-100 cursor-pointer transition">
          <Link to={"/dashboard"}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 rounded-md border-0 hover:bg-red-400 text-red-600 hover:text-white cursor-pointer transition">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    </nav>
  );
}

export default TopNavbar;