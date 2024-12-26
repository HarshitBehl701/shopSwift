import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from  "../components/Cards";

function Product() {

    const products = [
        {
          imageObj: {
            src: "https://placehold.co/200x200/png",
            alt: "Alternate Text",
          },
          title: "Title",
          description: "Description",
        },
        {
          imageObj: {
            src: "https://placehold.co/200x200/png",
            alt: "Alternate Text",
          },
          title: "Title",
          description: "Description",
        },
        {
          imageObj: {
            src: "https://placehold.co/200x200/png",
            alt: "Alternate Text",
          },
          title: "Title",
          description: "Description",
        },
        {
          imageObj: {
            src: "https://placehold.co/200x200/png",
            alt: "Alternate Text",
          },
          title: "Title",
          description: "Description",
        },
        {
          imageObj: {
            src: "https://placehold.co/200x200/png",
            alt: "Alternate Text",
          },
          title: "Title",
          description: "Description",
        },
        {
          imageObj: {
            src: "https://placehold.co/200x200/png",
            alt: "Alternate Text",
          },
          title: "Title",
          description: "Description",
        },
        {
          imageObj: {
            src: "https://placehold.co/200x200/png",
            alt: "Alternate Text",
          },
          title: "Title",
          description: "Description",
        },
        {
          imageObj: {
            src: "https://placehold.co/200x200/png",
            alt: "Alternate Text",
          },
          title: "Title",
          description: "Description",
        },
        {
          imageObj: {
            src: "https://placehold.co/200x200/png",
            alt: "Alternate Text",
          },
          title: "Title",
          description: "Description",
        },
        {
          imageObj: {
            src: "https://placehold.co/200x200/png",
            alt: "Alternate Text",
          },
          title: "Title",
          description: "Description",
        },
        {
          imageObj: {
            src: "https://placehold.co/200x200/png",
            alt: "Alternate Text",
          },
          title: "Title",
          description: "Description",
        },
        {
          imageObj: {
            src: "https://placehold.co/200x200/png",
            alt: "Alternate Text",
          },
          title: "Title",
          description: "Description",
        },
        {
          imageObj: {
            src: "https://placehold.co/200x200/png",
            alt: "Alternate Text",
          },
          title: "Title",
          description: "Description",
        },
        {
          imageObj: {
            src: "https://placehold.co/200x200/png",
            alt: "Alternate Text",
          },
          title: "Title",
          description: "Description",
        },
        {
          imageObj: {
            src: "https://placehold.co/200x200/png",
            alt: "Alternate Text",
          },
          title: "Title",
          description: "Description",
        },
      ];

  return (
    <>
      <Navbar currentPage="Products" />
      <div className="productionInfo my-12  px-8">
        <h1 className="text-xl font-semibold">Product Title</h1>
        <div className="twoSectionLayout flex   justify-center  md:flex-nowrap flex-wrap  h-fit py-3">
            <div className="leftSection md:w-1/2 w-full">
                <img src="https://placehold.co/300x200/png" alt="image"  className="w-[300px] h-[200px] object-cover rounded-lg shadow-sm" />
            </div>
            <div className="rightSection w-full  md:py-0  py-4">
                <h2 className="text-xl">Pricing</h2>
                <ul className="w-1/2">
                    <li  className="flex items-center  justify-between"><span>Price</span><span>1200</span></li>
                    <li  className="flex items-center  justify-between"><span>Discount</span><span>-200</span></li>
                    <li  className="flex items-center  justify-between"><span>GST</span><span>-120</span></li>
                    <li  className="flex items-center  justify-between"><span>Platform Fee</span><span className="text-green-500">Free</span></li>
                </ul>
                <hr  className="w-1/2 border-zinc-300 my-2" />
                <ul className="w-1/2">
                    <li  className="flex items-center  justify-between text-xl"><span>Grand Total</span><span>1350</span></li>
                </ul>
            </div>
        </div>
      </div>

        <h2   className="text-xl font-semibold mx-8  mt-12">View Similar Products</h2>
        <div className="productsContainer  py-8  flex items-center rounded-lg  justify-center gap-3 w-full flex-wrap">
          {products.map((product, index) => (
            <Cards
              key={index}
              imageObj={product.imageObj}
              title={product.title}
              description={product.description}
            />
          ))}
        </div>
      <Footer />
    </>
  );
}

export default Product;
