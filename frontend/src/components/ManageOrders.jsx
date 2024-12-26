import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; 

function ManageOrders() {
  return (
    <>
        <h1 className='font-semibold'>Orders</h1>
        <ul className='mt-4'>
            <li className='my-2  border-b border-zinc-300 p-2  flex justify-between'>
                <div className="leftSide flex gap-3">
                <div className="imageContainer">
                <img src="https://placehold.co/90" alt="productImage"  className="w-[90px]  h-[90px]  object-cover rounded-md" />
                </div>
                <ul>
                    <li className='text-xs font-semibold'>Name</li>
                    <li className='text-xs font-semibold'>Price</li>
                    <li className='text-xs font-semibold'>description</li>
                </ul>
                </div>
                <div className="rightSide">
                    <Link to={'/'} >
                    <FontAwesomeIcon icon={solidHeart} className="text-slate-200 text-2xl" />
                    </Link>
                </div>
            </li>
        </ul>
    </>
  )
}

export default ManageOrders