import { useState, useEffect } from "react";

const brands = [
  { id: 1, name: "Nike", logo: "https://cdn.brandfetch.io/id_0dwKPKT/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { id: 2, name: "Adidas", logo: "https://cdn.brandfetch.io/idyqQWKFVE/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B  " },
  { id: 3, name: "Puma", logo: "https://cdn.brandfetch.io/idDV9AjI6R/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { id: 5, name: "Under Armour", logo: "https://cdn.brandfetch.io/idu8xi0DFE/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { id: 6, name: "New Balance", logo: "https://cdn.brandfetch.io/idjR6yqXUb/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { id: 7, name: "Asics", logo: "https://cdn.brandfetch.io/idiu2_feRY/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { id: 8, name: "Fila", logo: "https://cdn.brandfetch.io/idg-BU8GW7/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { id: 9, name: "Skechers", logo: "https://cdn.brandfetch.io/idIEXH6y5f/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { id: 10, name: "Vans", logo: "https://cdn.brandfetch.io/id4pDar7o9/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { id: 11, name: "Converse", logo: "https://cdn.brandfetch.io/idDFGP8t3W/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { id: 12, name: "Timberland", logo: "https://cdn.brandfetch.io/idll7jDCQr/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { id: 14, name: "Gucci", logo: "https://cdn.brandfetch.io/idsVLhORjl/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { id: 15, name: "Louis Vuitton", logo: "https://cdn.brandfetch.io/idQH6e1xMu/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
];

function BrandsStrip() {
  const [scrollX, setScrollX] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX((prev) => (prev - 1) % (brands.length * 150));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[98%] mx-auto overflow-hidden">
      <div
        className="flex gap-8 items-center w-max"
        style={{ transform: `translateX(${scrollX}px)`, transition: "0.2s linear" }}
      >
        {brands.concat(brands).map((brand, index) => (
          <img
            key={index}
            src={brand.logo}
            alt={brand.name}
            className="h-20 w-auto object-contain mx-4"
          />
        ))}
      </div>
    </div>
  );
}

export default BrandsStrip;