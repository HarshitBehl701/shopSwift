import React, { useState } from 'react';
import  {updateCommentStatus}  from  "../utils/productHelpers";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/toastContainerHelperfn";

function DropDownComments({ data }) {

  const  handleCommentStatusUpdate  = async  (productId,orderId,status,commentId) => {
      const  newStatus  = (status ==  1)  ? 'hide'   : 'show';
      const response   = await updateCommentStatus(productId,orderId,newStatus,commentId);
      if(!response.status){
        handleError(response.message);
      }else{
        handleSuccess('Successfully  updated  Comment Status');
        setTimeout(()  => window.location.reload(),1000);
      }
  }

  return (
    <div className="py-4 px-6 border rounded-md shadow-sm">
      <ul>
        {Array.isArray(data) &&
          data.length > 0 &&
          data.reverse().map((obj, index) => (
            <li key={index} className="border-b p-2 border-gray-200">
              <div className="twoSectionLayout flex gap-3">
                <div className="rightSideSection">
                  <div className="profilePicContainer w-14 h-14 rounded-full border overflow-hidden cursor-pointer hover:scale-105 duration-200 transition-all shadow-sm">
                  <img
                    src={`/uploads/profilePic/${obj.picture}`}
                    alt="profilePic"
                    />
                    </div>
                </div>

                <div className="leftSideSection  w-full">
                  <p className="userName text-sm">{obj.user}</p>
                  <p className="date text-xs text-gray-500">{obj.dateOfComment}</p>
                  <ExpandableComment comment={obj.comment} />
                  <p className="buttonsContainer flex items-center gap-3 mt-2">
                    <button className="text-xs font-semibold text-gray-500" onClick={()   => handleCommentStatusUpdate(obj.productId,obj.orderId,obj.status,obj.commentId)}>{obj.status  == 1 ? 'Hide'  : 'Show'}</button>
                    <button className="text-xs font-semibold text-blue-500">Reply</button>
                  </p>
                </div>
              </div>
            </li>
          ))}
        {Array.isArray(data) && data.length === 0 && (
          <li>No Comments Yet...</li>
        )}
      </ul>
      <ToastContainer />
    </div>
  );
}

function ExpandableComment({ comment }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <p className="text-sm text-gray-800 mt-1">
      {expanded ? comment : `${comment.slice(0, 100)}${comment.length > 100 ? '...' : ''}`}
      {comment.length > 100 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 text-xs font-semibold ml-2"
        >
          {expanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </p>
  );
}

export default DropDownComments;