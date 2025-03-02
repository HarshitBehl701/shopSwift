import { LayoutDashboard, Users, LogOut, Network, ShoppingBag, ShoppingBasket } from "lucide-react";
import DropDownMenu from "./DropDownMenu";
import { useMemo } from "react";
import { ISideNavbarDropDownMenu } from "../../interfaces/componentsInterface";
import { Button } from "../ui/button";
import { unsetLocalStorageVariables } from "@/utils/commonUtils";
import { Link } from "react-router-dom";

function SideNavbar() {
  const menus: ISideNavbarDropDownMenu[] = useMemo(() => (
    [
      {
        title: <><Network /> Category/SubCategory</>,
        subMenus: [
          { link: "/page/categories", title: "Categories" },
          { link: "/page/subcategories", title: "SubCategories" }
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
    <div className="w-64 min-h-screen bg-gray-900 text-white p-4 md:block hidden">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <div className="sideNavMenu h-[90%] flex flex-col  justify-between">
      <ul className="space-y-2 text-sm">
        <Link to="/dashboard">
        <li className="flex hover:bg-gray-700 p-3 rounded-md items-center gap-2 cursor-pointer">
          <LayoutDashboard /> Dashboard
        </li>
        </Link>
        {Array.isArray(menus) && menus.map((menu) => (
            <DropDownMenu key={menu.subMenus[0]['title']+Math.random()} title={menu.title}>
            {menu.subMenus.map((subMenu, subIndex) => (
              <Link to={subMenu.link} key={subMenu.title}>
                <li key={subIndex} className="hover:bg-gray-800 p-2 rounded-md cursor-pointer">
                  {subMenu.title}
                </li>
              </Link>
            ))}
          </DropDownMenu>
        ))}
      </ul>
        <Button className="flex hover:bg-red-500 hover:text-white rounded-md items-center gap-2 cursor-pointer text-red-400 bg-transparent shadow-none border-0 w-full" onClick={unsetLocalStorageVariables}><LogOut /> Logout</Button>
      </div>
    </div>
  );
}

export default SideNavbar;