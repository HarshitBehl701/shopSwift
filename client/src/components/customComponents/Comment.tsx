import { FormEvent, useCallback, useState } from "react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { addNewComment } from "@/api/commentApi";
import { IApiResponse } from "@/interfaces/apiInterfaces";
import { ICommentParam } from "@/interfaces/componentInterfaces";

function Comment({order_id,product_id}:ICommentParam) {
  const [comment,setComment] =  useState<string |  null>(null);
  const  handleAddCommentFormSubmit   = useCallback(async(ev:FormEvent) =>{
    ev.preventDefault();
    if(comment && order_id)
    {
      try {
        const  response = await addNewComment({order_id:order_id,product_id:product_id,user_comment:comment}) as IApiResponse;
        if(response.status)
        {
          handleToastPopup({message:"Successfully Add  New Comment",type:"success"});
          setTimeout(() =>  window.location.reload(),1000);
        }else{
          handleToastPopup({message:(response.message),type:"error"});
        }
      } catch (error) {
          handleToastPopup({message:handleCatchErrors(error),type:"error"});
      }
    }
  },[comment,order_id,product_id]);
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold">Leave a Comment</h3>
      <form onSubmit={handleAddCommentFormSubmit}>
        <Textarea
          placeholder="Write your comment here..."
          className="mt-4 resize-none"
          value={comment ?? ''}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit" color="blue" className="mt-4 cursor-pointer text-xs font-semibold p-2 ml-auto   block">
          Submit Comment
        </Button>
      </form>
    </div>
  )
}

export default Comment