import React from "react";

function Loader() {
  return (
    <div className="absolute w-full top-0 left-0 z-50 flex flex-col  gap-2 justify-center items-center h-full bg-slate-100 bg-opacity-50 backdrop-blur-md">
      <div className="w-20 h-20 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <p className="text-center text-sm italic text-black mt-4">Loading...</p>
    </div>
  );
}

export default Loader;
