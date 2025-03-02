import { FormEvent, useCallback, useState } from "react"
import { Button } from "../components/ui/button"
import { IApiResponse, ICreateContactForm } from "@/interfaces/apiInterfaces";
import { handleCatchErrors, handleToastPopup } from "@/utils/commonUtils";
import { createNewContactForm } from "@/api/mainApi";
import { ToastContainer } from "react-toastify";

function Contact() {
  const [formData,setFormData] = useState<ICreateContactForm>({} as ICreateContactForm);

  const  hanldeFormSubmit =  useCallback(async(ev:FormEvent) =>  {
    ev.preventDefault();
    try {
        const  response =  await createNewContactForm(formData) as   IApiResponse;

        if(response.status)
        {
          handleToastPopup({message:"Successfully  Submitted Contact  Form",type:"success"});
          setTimeout(() => window.location.reload(),1000);
        }else{
          handleToastPopup({message:(response.message),type:"error"});
        }

    } catch (error) {
      handleToastPopup({message:handleCatchErrors(error),type:"error"});
    }
  },[formData]);

  return (
    <div className=" p-6 my-12 w-[90%] mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section - Contact Form */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <form onSubmit={hanldeFormSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev,name:e.target.value}))}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({...prev,email:e.target.value}))}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-3 border  resize-none border-gray-300 rounded-md"
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({...prev,message:e.target.value}))}
              ></textarea>
            </div>
            <Button className="w-full text-white">
              Send Message
            </Button>
          </form>
        </div>

        {/* Right Section - Company Details */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Location</h2>
          <p className="text-gray-700 mb-4">We are located at:</p>
          <p className="font-semibold text-gray-800">XYZ Company</p>
          <p className="text-gray-700">1234 Street Name, City, State, 56789</p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Find Us on Google</h3>
            <div className="mt-2">
              {/* Placeholder for Google Map or Address */}
              <div className="w-full h-64 bg-gray-200 rounded-md">
                {IFrame()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>

  )
}

export default Contact


const IFrame =  () => {
  return  (
    <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d7003.215120846395!2d77.04958846494013!3d28.641521660898665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1740746992428!5m2!1sen!2sin" className="border-0 w-full  h-full" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
  )
}