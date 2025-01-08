import React,{useState} from "react";
import  {Link}   from 'react-router-dom';

function NavbarProfileBtn({dropDownOptions, currentUser}) {

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const imageSrc  =  "/assets/user.png";

  return (
    <div className="profileBtnMainContainer relative">
    <div
      className={`profileiconcontainer flex items-center justify-center cursor-pointer`}
      onClick={toggleDropdown}
    >
      <img
        src={imageSrc}
        alt="profile"
        className="object-cover w-8 h-8 rounded-full border"
      />
    </div>
    <ul className={isOpen ? "absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10 h-fit overflow-hidden" : "absolute right-0 mt-2 w-48 h-0 overflow-hidden" }>
      {Array.isArray(dropDownOptions) &&  dropDownOptions.length > 0  &&  dropDownOptions.map((option, index) => (
        <Link
          key={index}
          to={`/${currentUser}/${option}`}
          className="text-sm text-gray-700"
        >
          <li className="px-4 py-2 hover:bg-gray-100">
            {option.indexOf("_") !== -1
              ? option.split("_")[0].charAt(0).toUpperCase() +
                option.split("_")[0].slice(1) +
                " " +
                option.split("_")[1].charAt(0).toUpperCase() +
                option.split("_")[1].slice(1)
              : option.charAt(0).toUpperCase() + option.slice(1)}
          </li>
        </Link>
      ))}
      <Link to={`/${currentUser}/profile`} className="text-sm text-gray-700">
        <li className="px-4 py-2 hover:bg-gray-100">Profile</li>
      </Link>
      <Link to="/logout" className="text-sm w-full text-left">
        <li className="px-4 py-2  text-white bg-red-500">Logout</li>
      </Link>
    </ul>
    </div>
  );
}

export default NavbarProfileBtn;
