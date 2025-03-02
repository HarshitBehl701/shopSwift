import { getImagePathUrl } from "@/utils/commonUtils"
import { Button } from "../ui/button"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom";

function HomeHeader() {
  const backgroundImage: string = useMemo(() => `url('${getImagePathUrl('main', 'header.jpg')}')`, []);
  const navigate  =  useNavigate();

  return (
    <header className="relative cursor-pointer shadow-sm h-96 text-white py-16 text-center flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <h1 className="text-4xl font-bold relative z-10">Welcome to ShopEase</h1>
      <p className="text-lg mt-2 relative z-10">Your one-stop shop for the best products</p>
      <Button variant="default" className="mt-4 relative z-10 cursor-pointer" onClick={() => navigate("/shop")} >Shop Now</Button>
    </header>
  );
}

export default HomeHeader;
