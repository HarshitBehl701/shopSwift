import  {ReactNode}   from   "react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Menu } from "lucide-react";
import SideNavbar from "../components/myComponents/SideNavbar";
import TopNavbar from "../components/myComponents/TopNavbar";


function BaseLayout({children}:{children:ReactNode}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
    <div className="flex md:flex-row flex-col  h-screen overflow-hidden">
      {sidebarOpen && <SideNavbar />}
      <TopNavbar  />
      <div className="flex-1 md:p-6 pt-6 px-3 h-screen  overflow-y-auto">
        <Button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-4 md:block  hidden">
          <Menu className="mr-2" />
        </Button>
        <div>
            {children}
        </div>
        </div>
    </div>
    </>
  )
}

export default BaseLayout