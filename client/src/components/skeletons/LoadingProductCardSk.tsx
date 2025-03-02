import { Card, CardContent, CardHeader } from "../ui/card"

function LoadingProductCardSk() {
  return (
    <Card className="w-full max-w-xs rounded-lg overflow-hidden shadow-lg bg-white animate-pulse">
        <CardHeader className="relative p-0">
          <div className="h-44 w-full bg-gray-300 rounded-none"></div>
          <div className="absolute right-4 top-4 h-6 w-6 bg-gray-300 rounded-full"></div>
        </CardHeader>
        <CardContent className="px-4">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
          <div className="h-3 bg-gray-300 rounded w-5/6 mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-full"></div>
        </CardContent>
      </Card>
  )
}

export default LoadingProductCardSk