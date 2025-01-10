import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Carousel } from "flowbite-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <Navbar currentPage="About" />
      <main className="container mx-auto px-6 py-12 font-sans">
        {/* Hero Section */}
        <section className="text-center mt-8">
          <h2 className="text-3xl font-semibold text-blue-600 tracking-tight leading-tight">
            About Scatch
          </h2>
          <p className="mt-6 text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed">
            At <span className="font-semibold text-blue-600">E-Shop</span>, we
            believe online shopping should be more than just a transaction; it
            should be an experience. Discover a curated selection of quality
            products that meet your needs and exceed your expectations.
          </p>
        </section>

        {/* About Section */}
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Carousel pauseOnHover>
            <img
              src="/assets/aboutUs1.jpeg"
              alt="About Us"
              className="rounded-xl shadow-xl transition-transform duration-300 object-cover object-center hover:scale-105"
            />
            <img
              src="/assets/aboutUs2.png"
              alt="About Us"
              className="rounded-xl shadow-xl transition-transform duration-300 object-cover object-center  hover:scale-105"
            />
            <img
              src="/assets/aboutUs3.jpg"
              alt="About Us"
              className="rounded-xl shadow-xl transition-transform duration-300 object-cover object-center  hover:scale-105"
            />
            <img
              src="/assets/aboutUs4.jpg"
              alt="About Us"
              className="rounded-xl shadow-xl transition-transform duration-300 object-cover object-center  hover:scale-105"
            />
          </Carousel>
          <div>
            <h3 className="text-3xl font-semibold text-gray-800 leading-snug">
              Who We Are
            </h3>
            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
              Established in 2023,{" "}
              <span className="font-medium text-blue-600">E-Shop</span> has been
              dedicated to transforming how people shop online. From our humble
              beginnings to becoming a trusted name in e-commerce, our journey
              is built on delivering quality, innovation, and trust to our
              customers.
            </p>
            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              With a team of passionate professionals, we constantly strive to
              offer the best products, seamless services, and an unforgettable
              shopping experience.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mt-20 bg-gradient-to-r from-blue-50 to-blue-100  w-full py-8 px-10 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-center text-gray-900">
            Our Mission
          </h3>
          <p className="mt-3 text-center text-gray-700 text-sm max-w-4xl mx-auto leading-relaxed">
            To revolutionize online shopping by creating an environment where
            convenience, quality, and customer satisfaction converge seamlessly.
            We aim to connect people with products that inspire and enrich their
            lives.
          </p>
        </section>

        {/* Core Values */}
        <section className="mt-20">
          <h3 className="text-3xl font-semibold text-center text-gray-900">
            Our Core Values
          </h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center  border p-8 bg-white shadow-md rounded-lg">
              <div className="text-6xl text-blue-600 mb-6">🤝</div>
              <h4 className="text-xl font-semibold text-gray-800">Integrity</h4>
              <p className="mt-2 text-gray-600 leading-relaxed">
                Honesty and transparency are at the heart of everything we do.
              </p>
            </div>
            <div className="text-center border p-8 bg-white shadow-md rounded-lg">
              <div className="text-6xl text-blue-600 mb-6">🌟</div>
              <h4 className="text-xl font-semibold text-gray-800">
                Excellence
              </h4>
              <p className="mt-2 text-gray-600 leading-relaxed">
                Continuously exceeding expectations with exceptional service.
              </p>
            </div>
            <div className="text-center  border p-8 bg-white shadow-md rounded-lg">
              <div className="text-6xl text-blue-600 mb-6">🌍</div>
              <h4 className="text-xl font-semibold text-gray-800">
                Sustainability
              </h4>
              <p className="mt-2 text-gray-600 leading-relaxed">
                Committed to creating a greener future for generations to come.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-20">
          <h3 className="text-3xl font-semibold text-center text-gray-900">
            What Our Customers Say
          </h3>
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={1}
            className="mt-10"
          >
            {/* Testimonial 1 */}
            <SwiperSlide>
              <div className="bg-white  p-6 shadow-md rounded-lg text-center">
                <div className="centeredImageDiv w-28 h-28 rounded-full border shadow-sm overflow-hidden mx-auto">
                  <img
                    src="/assets/person1.jpg"
                    alt="Customer"
                    className="object-cover object-center h-28 w-auto"
                  />
                </div>
                <p className="text-gray-700 italic leading-relaxed mt-4">
                  "E-Shop has completely transformed the way I shop online.
                  Their products are top-notch, and the customer service is
                  unparalleled!"
                </p>
                <div className="mt-4 text-blue-600 font-medium">- Alex J.</div>
              </div>
            </SwiperSlide>

            {/* Testimonial 2 */}
            <SwiperSlide>
              <div className="bg-white p-6 text-center">
                <div className="centeredImageDiv w-28 h-28 rounded-full border shadow-sm overflow-hidden mx-auto">
                  <img
                    src="/assets/person2.jpg"
                    alt="Customer"
                    className="object-cover object-center h-28 w-auto"
                  />
                </div>
                <p className="text-gray-700 italic leading-relaxed mt-4">
                  "Fast delivery, amazing quality, and excellent prices. E-Shop
                  is my go-to store for all my needs."
                </p>
                <div className="mt-4 text-blue-600 font-medium">- Priya S.</div>
              </div>
            </SwiperSlide>

            {/* Additional Testimonials */}
            <SwiperSlide>
              <div className="bg-white p-6  text-center">
                <div className="centeredImageDiv w-28 h-28 rounded-full border shadow-sm overflow-hidden mx-auto">
                  <img
                    src="/assets/person3.jpg"
                    alt="Customer"
                    className="object-cover object-center h-28 w-auto"
                  />
                </div>
                <p className="text-gray-700 italic leading-relaxed mt-4">
                  "Shopping with E-Shop has been a breeze! The variety and
                  quality are unmatched."
                </p>
                <div className="mt-4 text-blue-600 font-medium">- Raj K.</div>
              </div>
            </SwiperSlide>
          </Swiper>
        </section>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <h3 className="text-3xl font-semibold text-gray-900">
            Join the E-Shop Family
          </h3>
          <p className="mt-2  text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Become a part of our growing community and enjoy the benefits of a
            seamless online shopping experience. Explore our wide range of
            products today!
          </p>
          <Link to={'/products'} className="inline-block mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md font-medium hover:bg-blue-700 transition">
            Start Shopping
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;
