import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TwoLayoutSection from "../components/TwoLayoutSection";

function About() {
  const whyChooseUs = [
    {
      imageObj: { imageLink: "/assets/loginRegisterBg.jpg", direction: "left" },
      heading: "Unmatched Quality, Every Time",
      description:
        "We prioritize quality in every product we offer, ensuring you receive only the best. Shop confidently knowing that we source items from trusted suppliers.",
      linkObj: { required: false, redirectPath: "/", text: "" },
    },
    {
      imageObj: {
        imageLink: "/assets/loginRegisterBg.jpg",
        direction: "right",
      },
      heading: "Fast & Reliable Delivery",
      description:
        "Our efficient logistics network ensures that your orders reach you on time, every time. Experience hassle-free delivery with tracking at your fingertips.",
      linkObj: { required: false, redirectPath: "/", text: "" },
    },
    {
      imageObj: { imageLink: "/assets/loginRegisterBg.jpg", direction: "left" },
      heading: "Exceptional Customer Support",
      description:
        "Our dedicated customer service team is available 24/7 to assist you with any queries or concerns. Your satisfaction is our top priority.",
      linkObj: { required: false, redirectPath: "/", text: "" },
    },
    {
      imageObj: {
        imageLink: "/assets/loginRegisterBg.jpg",
        direction: "right",
      },
      heading: "Exclusive Deals & Offers",
      description:
        "Enjoy unbeatable prices and exclusive discounts when you shop with us. Save more with seasonal sales and member-only benefits.",
      linkObj: { required: false, redirectPath: "/", text: "" },
    },
  ];

  return (
    <>
      <Navbar currentPage="About" />

      <h1 className="mt-20  text-center font-semibold text-2xl">
        About{" "}
        <span className="text-blue-600 hover:text-blue-700   cursor-pointer">
          Scatch
        </span>
      </h1>

      <div className="aboutUsContentArea  w-full h-fit px-12  py-2  text-center">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi officia
        exercitationem totam nostrum quia soluta nihil? Consectetur vel earum
        omnis quo, atque quisquam dolor officiis dolore vitae. Animi, fugiat
        doloremque! Necessitatibus quod aspernatur recusandae, at commodi nemo
        eius molestias asperiores fugiat soluta iste quaerat quo animi, harum
        distinctio quae omnis quisquam facilis veniam exercitationem corporis.
        Sapiente rem soluta pariatur laudantium. Reprehenderit architecto harum
        neque. Nostrum eum eius quod praesentium, excepturi, veniam veritatis
        amet itaque optio blanditiis voluptas. Rem doloribus nam, dolorem natus
        temporibus voluptate placeat deleniti accusantium, reprehenderit
        mollitia quo. Officia deleniti doloremque explicabo sit eum voluptatum
        nesciunt maiores cumque modi, laborum sunt veniam, aliquam libero odio
        consequatur placeat dolore corrupti maxime. Maiores aliquid reiciendis
        expedita voluptate nulla blanditiis modi! Animi qui quidem omnis placeat
        incidunt error distinctio. Incidunt dolore aut velit, nesciunt
        voluptatibus blanditiis, quod tempore numquam accusamus iste mollitia
        iure veritatis earum! Rerum fuga laborum nam cum. Aspernatur? Magnam qui
        numquam at quia soluta quo amet illo, ratione itaque dignissimos
        consequuntur architecto vel ipsam laborum in odit a laboriosam dicta
        nisi? Id praesentium perferendis aliquid aut accusamus sapiente?
      </div>

      <h1 className="text-center text-xl font-semibold  mt-10">
        Why Choose Us?
      </h1>
      {whyChooseUs.map((section, index) => (
        <TwoLayoutSection
            key={index}
          imageObj={section.imageObj}
          heading={section.heading}
          description={section.description}
          linkObj={section.linkObj}
        />
      ))}

      <Footer />
    </>
  );
}

export default About;
