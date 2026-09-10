import React, { useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen  bg-gray-50 py-6 sm:py-12 flex flex-col lg:flex-row items-center lg:items-start justify-center">

      {/* Form Section */}
      <div className="relative w-full ml-10 lg:w-[37%] lg:pb-10 px-4 sm:px-6 lg:px-0 mb-0 lg:ml-20 lg:mb-0">
        <div className="absolute lg:h-full inset-0 h-full bg-gradient-to-r from-green-700 to-green-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

        <div className="relative bg-gray-100 shadow-lg sm:rounded-3xl sm:p-20 p-6 text-green-900">
          <div className="text-center pb-6">
            <h1 className="text-4xl font-bold font-sharif text-green-900 pb-3">Contact Us!</h1>
            <p className="text-green-700 text-lg">
              Fill up the form below to send us a message.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />

            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              placeholder="Type your message here..."
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={{ minHeight: "120px" }}
            ></textarea>

            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <button
                type="submit"
                className="shadow bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
              >
                Send ➤
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="shadow bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Animation Section */}
      <div className="w-full ml-10 lg:w-[50%] lg:h-130 lg:pl-10 flex justify-center lg:m-auto px-4 sm:px-6">
        <DotLottieReact
          src="/Welcome.lottie"
          loop
          autoplay
          className="w-full sm:w-96 lg:w-auto"
        />
      </div>
    </div>
  );
};

export default Contact;
