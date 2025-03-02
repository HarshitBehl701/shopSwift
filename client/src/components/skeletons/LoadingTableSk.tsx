const LoadingTableSkeleton = () => {
    return (
      <div className="mt-4 w-full animate-pulse">
        <div className="w-full h-10 bg-gray-300 rounded mb-2"></div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex justify-between w-full h-8 bg-gray-300 rounded mb-3"></div>
        ))}
      </div>
    );
  };

export default  LoadingTableSkeleton;