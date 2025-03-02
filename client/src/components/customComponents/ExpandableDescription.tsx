import { IExpandableDescription } from "@/interfaces/componentInterfaces"
import { Button } from "../ui/button"
import { useState } from "react"

function ExpandableDescription({description,maxLength}:IExpandableDescription) {
    const  [isHidden,setIsHidden] = useState<boolean>(true);
  return (
    <div className="flex   items-center gap-3 flex-wrap w-full">
        <p className="capitalize text-justify">
            {isHidden &&  description.length > maxLength ? description.slice(0,maxLength) +  '...' : description}
        </p>
        {description.length > maxLength  && <Button onClick={() =>  setIsHidden(!isHidden)}   variant={'link'} className="text-xs cursor-pointer text-blue-500 p-0">{isHidden ?  'Show' : 'Hide'}</Button>}
    </div>
  )
}

export default ExpandableDescription