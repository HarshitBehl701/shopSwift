import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

function DropDownMenu({ title, children }: { title: ReactNode; children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="flex justify-between items-center hover:bg-gray-700  hover:text-white p-3 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">{title}</span>
        <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>
      {isOpen && <div className="ml-6 space-y-2">{children}</div>}
    </div>
  );
}

export default DropDownMenu