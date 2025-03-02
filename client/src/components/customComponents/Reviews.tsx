import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Avatar } from "../ui/avatar"
import { IReviewsParam } from "@/interfaces/componentInterfaces"
import { useEffect, useState } from "react"
import { ICommentModal } from "@/interfaces/commonInterfaces"
import { formatDate, getImagePathUrl, handleCatchErrors } from "@/utils/commonUtils"
import { getAllProductComments } from "@/api/commentApi"
import ExpandableDescription from "./ExpandableDescription"
import { IGetAllProductCommentsResponse } from "@/interfaces/apiInterfaces"
import LoadingCommentSk from "../skeletons/LoadingCommentSk"

function Reviews({product_id}:IReviewsParam) {
  const  [comments,setComments] = useState<ICommentModal[] | null>(null);

  useEffect(() => {
    if(product_id)
    {
      ;(async() =>{
        try {
          const  response = await  getAllProductComments({product_id:product_id});
          if(response.status)
          {
            const responseData = (response.data as  IGetAllProductCommentsResponse).comments;
            setComments(responseData);
          }else{
            setComments(null)
            throw new  Error(response.message);
          }
        } catch (error) {
          setComments(null)
          throw new  Error(handleCatchErrors(error));
        }
      })()
    }
  },[product_id]);

  return (
    <div className="w-full   mt-4">
    <h3 className="text-xl font-semibold mt-3">Customer Reviews</h3>

    {Array.isArray(comments) && comments.length > 0 &&  
      comments.map((comment) =>  
        <div className="twoSectionLayout cursor-pointer shadow-sm rounded-md  my-3 border  border-gray-300  p-3 flex items-start space-x-6 py-4" key={comment.user_name + Math.random()}>
          <div className="leftSection w-16 flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage 
                src={getImagePathUrl('user', comment.user_photo)} 
                className="h-16 w-16 rounded-full object-cover" 
              />
              <AvatarFallback>
                <img 
                  src={getImagePathUrl('main', 'logo.png')} 
                  alt="User Image" 
                  className="h-16 w-16 rounded-full object-cover" 
                />
              </AvatarFallback>
            </Avatar>            
          </div>

          <div className="rightSection flex flex-col text-gray-700 text-sm w-2/3">
            <div className="text-sm">
              <h4 className="font-semibold">{comment.user_name}</h4>
              <p className="text-xs">{formatDate(comment.created_at)}</p>
            </div>
            <ExpandableDescription description={comment.user_comment} maxLength={50} />
          </div>
        </div>

      )
    }

    {!comments  &&  <LoadingCommentSk />}

    {Array.isArray(comments) && comments.length == 0 && <p className="text-sm italic mt-2">No Reviews  Yet...</p>}

  </div>
  )
}

export default Reviews