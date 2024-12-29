import React, { useState } from 'react'

function AddProduct() {
    const requiredFields = ['name','category','price','discount','description'];
    const [formData,setFormData] = useState({
        name: '',
        sellerId: '',
        category: '',
        price: '',
        discount: '',
        description: ''
    })

  return (
    <>
        <h1  className='font-semibold'>Add  Product</h1>
        <hr className='mt-2 mb-4 border border-zinc-200' />
        <form action="">
        {requiredFields.map((field,index)=><input
            key={index}
          type='text'
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="block my-2 w-full border-zinc-300 outline-none rounded-md"
        />)}
            <input type="submit" value="Create  Product" className='font-semibold mt-4 text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white  rounded-md  shadow-sm  cursor-pointer' />
        </form>
    </>
  )
}

export default AddProduct