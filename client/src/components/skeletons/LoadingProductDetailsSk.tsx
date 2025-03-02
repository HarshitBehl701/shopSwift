import { Card } from "@/components/ui/card";

const LoadingProductDetailsSk = () => {
  return (
    <div className="mb-8 w-[90%] mx-auto my-16 animate-pulse">
      <Card>
        <div className="p-6">
          <div className="flex items-center flex-wrap gap-4">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
        <div className="flex px-6 md:flex-row flex-col">
          <div className="md:w-48 w-full md:h-48 h-96 bg-gray-300 rounded"></div>
          <div className="md:ml-6 md:p-2 p-0 md:mt-0 mt-7 w-full">
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="flex gap-3 items-center mt-3">
              <div className="h-6 bg-gray-300 rounded w-1/5"></div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="h-5 w-5 bg-gray-300 rounded"></div>
                ))}
              </div>
              <div className="h-6 bg-gray-300 rounded w-1/6"></div>
            </div>
            <div className="flex gap-3 items-center mt-3">
              <div className="h-10 bg-gray-300 rounded w-1/3"></div>
              <div className="h-10 bg-gray-300 rounded w-1/3"></div>
              <div className="h-10 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
        </div>
      </Card>
    </div>
  );
};

export default LoadingProductDetailsSk;