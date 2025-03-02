const LoadingProductListSkeleton = () => {
    return (
      <div className="block my-4 animate-pulse">
        <div className="flex h-fit p-4 rounded-md gap-4 shadow-sm border border-gray-300">
          {/* Left Section */}
          <div className="w-28 flex items-center justify-center bg-gray-300 h-28 rounded"></div>
  
          {/* Right Section */}
          <div className="w-2/3">
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-5/6 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  };

export default  LoadingProductListSkeleton;