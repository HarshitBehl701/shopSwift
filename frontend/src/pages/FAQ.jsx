import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is your return policy?",
      answer: "You can return most items within 30 days of purchase for a full refund, provided the items are in their original condition.",
    },
    {
      question: "How can I track my order?",
      answer: "You can track your order from the 'Orders' page in your profile section.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we only offer domestic shipping. However, we plan to offer international shipping soon.",
    },
    {
      question: "Can I cancel or modify my order?",
      answer: "Once an order is placed, it cannot be modified. However, you can cancel the order before it is shipped.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards, PayPal, and Apple Pay.",
    },
  ];
  

  return (
    <>
      <Navbar currentPage={"faq"} />
      <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8  my-12">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Frequently Asked Questions
        </h1>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md  border border-zinc-100 space-y-6">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                className="w-full text-left text-lg font-semibold text-gray-800 py-4 px-6 transition-all ease-in-out duration-300 hover:bg-gray-100 focus:outline-none focus:ring-0"
                onClick={() => toggleAccordion(index)}
              >
                {item.question}
              </button>
              {activeIndex === index && (
                <div className="px-6 py-4 text-gray-600 bg-gray-50 rounded-b-lg">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FAQ;
