import React from 'react';

function Comments({data}) {
  return (
    <div className="px-14 py-6 w-[90%] shadow-md border mx-auto rounded-md bg-white">
      <h1 className="font-semibold text-lg mb-4">Comments</h1>
      <div className="commentContainer border p-4 rounded-md">
        <ul className="space-y-4  max-h-[200px] overflow-y-auto">
          {Array.isArray(data) && data.length > 0 && data.map((comment,index) => (
            <li key={index} className="border-b pb-2 last:border-none">
              <div className="flex items-start space-x-3">
                <div className="bg-gray-200 h-10 w-10 flex-shrink-0 rounded-full  overflow-hidden  hover:scale-105 cursor-pointer  duration-300">
                    <img src={`/uploads/profilePic/${comment.picture}`} alt="profilePicture"  className='hover:scale-105 duration-200' />
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-700">{comment.user}</p>
                  <p className="text-sm text-gray-500">{comment.dateOfComment}</p>
                  <p className="text-gray-800 mt-1">{comment.comment}</p>
                </div>
              </div>
            </li>
          ))}
          {Array.isArray(data) && data.length == 0 && <li  className='italic  font-light'>No comments yet...</li>}
        </ul>
      </div>
    </div>
  );
}

export default Comments;