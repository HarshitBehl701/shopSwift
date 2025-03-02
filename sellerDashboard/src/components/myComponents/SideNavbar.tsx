import { LayoutDashboard, LogOut, ShoppingBag, ShoppingBasket } from "lucide-react";
import DropDownMenu from "./DropDownMenu";
import { useMemo } from "react";
import { ISideNavbarDropDownMenu } from "@/interfaces/componentsInterface";
import { Link } from "react-router-dom";

function SideNavbar() {
  const menus: ISideNavbarDropDownMenu[] = useMemo(() => (
    [
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
      }
    ]
  ), []);

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-4 md:block hidden">
      <h2 className="text-xl font-bold mb-6">Seller Dashboard</h2>
      <div  className="flex  flex-col justify-between h-[90%]">
      <ul className="space-y-4 text-sm">
        <Link to="/dashboard" className="block">
        <li className="flex hover:bg-gray-700 p-3 rounded-md items-center gap-2 cursor-pointer">
          <LayoutDashboard /> Dashboard
        </li>
        </Link>
        {menus.map((menu, index) => (
          <DropDownMenu key={index} title={menu.title}>
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
        <Link to={"/logout"}  className="flex w-full hover:bg-red-500 hover:text-white p-3 rounded-md items-center gap-2 cursor-pointer text-red-400">
          <LogOut /> Logout
        </Link>
      </div>
    </div>
  );
}

export default SideNavbar;