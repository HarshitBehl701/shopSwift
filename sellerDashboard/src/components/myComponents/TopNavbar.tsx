import { Menu, User } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { LayoutDashboard, LogOut, ShoppingBag, ShoppingBasket } from "lucide-react";  
import DropDownMenu from "./DropDownMenu";
import { useMemo } from "react";
import { ISideNavbarDropDownMenu } from "@/interfaces/componentsInterface";
import { Link } from "react-router-dom";

function TopNavbar() {
  const menus: ISideNavbarDropDownMenu[] = useMemo(() => (
    [
      {
        title: <><ShoppingBag /> Orders</>,
        subMenus: [
          { link: "/pending-orders", title: "Pending Orders" },
          { link: "/completed-orders", title: "Completed Orders" }
        ]
      },
      {
        title: <><ShoppingBasket /> Products</>,
        subMenus: [
          { link: "/products", title: "All Products" },
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
                  {menu.subMenus.map((subMenu) => (
                    <Link key={subMenu.title} to={subMenu.link}>
                      <li className="hover:bg-gray-800  hover:text-white p-2 rounded-md cursor-pointer">
                        {subMenu.title}
                      </li>
                    </Link>
                  ))}
                </DropDownMenu>
              ))}
              <Link to={"/logout"}>
              <li className="flex items-center hover:bg-red-500 hover:text-white font-semibold rounded-md p-3 gap-2 cursor-pointer text-red-400">
                <LogOut /> Logout
              </li>
              </Link>
            </ul>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <div className="flex items-center gap-4">
        <User className="cursor-pointer" />
      </div>
    </nav>
  );
}

export default TopNavbar;