import { usePageContext } from "@/contexts/pageContext"
import { getImagePathUrl } from "@/utils/commonUtils"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Button } from "../ui/button"
import LoadingCategorySk from "../skeletons/LoadingCategorySk"

function Categories() {
  const {categories} = usePageContext()
  return (
    <section className="py-12 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-16">
          {categories?.map((category) => 
          <div className="overflow-hidden h-44  pb-3 cursor-pointer border border-gray-300 rounded-lg shadow-md hover:shadow-lg" key={category.category_name}>
            <Avatar className="shadow-sm">
              <AvatarImage   className="object-contain object-center h-32 w-full" src={getImagePathUrl('other',category.category_image)} />
              <AvatarFallback>
                <img src={getImagePathUrl('main',"logo.png")} alt={category.category_name} className="object-cover object-center h-32 w-full" />
              </AvatarFallback>
            </Avatar>
            <Button variant={'link'} className="mt-2 cursor-pointer font-medium  capitalize">{category.category_name}</Button>
          </div>
          )}
          {categories  ===  null   &&  
            Array.from({length:5}).map(() => <LoadingCategorySk key={Math.random()} />)
          }
        </div>
      </section>
  )
}

export default Categories