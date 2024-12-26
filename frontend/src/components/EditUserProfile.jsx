import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

function EditUserProfile() {
  return (
    <>
    <h1 className='font-semibold'>Edit Profile</h1>
    <div className="imageContainer rounded-full w-[100px]  h-[100px] overflow-hidden  mx-auto relative">
        <img src="https://placehold.co/200" alt="profile pic"  />
        <form action="">
            <input type="file" name='profilePic'  className='hidden'/>
            <button type="submit" className='w-[100px]  h-[100px] absolute top-0  cursor-pointer'>
            <FontAwesomeIcon icon={faCamera} className="text-lg   text-white" />
            </button>
        </form>
    </div>
    <p  className='text-xs text-center italic'>Profile  Picture</p>
    <br />
    <hr />
    <br />
    <form action="">
        <input type="text" name='name'  placeholder='Full Name' className='block my-2 w-full border-zinc-300 outline-none rounded-md' />
        <input type="email" name='email'  placeholder='Email' className='block w-full my-2 border-zinc-300 outline-none rounded-md' />
        <input type="text" name='address'  placeholder='Address' className='block w-full my-2 border-zinc-300 outline-none rounded-md' />
        <input type="tel" name='phone'  placeholder='Phone Number' className='block w-full my-2 border-zinc-300 outline-none rounded-md' />
        <input type="submit"   value='Save Changes'  className='text-xs  mt-3  py-1 px-2  font-semibold  cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-md   shadow-md' />
    </form>
    </>
  )
}

export default EditUserProfile