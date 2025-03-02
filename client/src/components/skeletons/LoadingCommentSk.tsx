const LoadingCommentSk = () => {
    return (
      <div className="twoSectionLayout shadow-sm rounded-md my-3 border border-gray-300 p-3 flex items-start space-x-6 py-4 animate-pulse">
        {/* Left Section */}
        <div className="leftSection w-16 flex items-center gap-4">
          <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
        </div>
        
        {/* Right Section */}
        <div className="rightSection flex flex-col text-gray-700 text-sm w-2/3">
          <div className="text-sm">
            <div className="h-5 bg-gray-300 rounded w-1/3 mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
          </div>
          <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
          <div className="h-3 bg-gray-300 rounded w-5/6 mb-1"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3 mb-1"></div>
        </div>
      </div>
    );
  };
  
  export default LoadingCommentSk;