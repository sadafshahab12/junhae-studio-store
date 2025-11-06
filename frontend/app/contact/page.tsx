"use client";
import React, { useState } from "react";
import InstagramIcon from "../icons/InstagramIcon";
import PinterestIcon from "../icons/PinterestIcon";
import TikTokIcon from "../icons/TikTokIcon";

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the form submission (e.g., send an email or API request).
    console.log("Form submitted:", formState);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white pt-16 font-sans">
      <div className="pt-16 sm:pt-24 pb-20  ">
        {/* Hero Section */}
        <div className="text-center container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900  animate-fade-in-up">
            Let’s Connect.
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600  animate-fade-in-up animation-delay-200">
            Have a question, a story, or just want to say hi? {`We’d`} love to
            hear from you.
          </p>
        </div>

        {/* Form and Info Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-2  animate-fade-in-up animation-delay-400">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center bg-stone-100 p-12 rounded-lg h-full">
                  <svg
                    className="w-16 h-16 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                    Thank you!
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Your message has been sent. {`We'll`} get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm py-3 px-4"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm py-3 px-4"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm py-3 px-4"
                    >
                      <option>General Inquiry</option>
                      <option>Order Help</option>
                      <option>Collaboration</option>
                      <option>Press</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formState.message}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm py-3 px-4"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto rounded-full bg-gray-900 px-10 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Details */}
            <div className="space-y-10  animate-fade-in-up animation-delay-600">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Reach out directly
                </h3>
                <p className="mt-2 text-gray-600">
                  Prefer to write a simple email?
                </p>
                <a
                  href="mailto:hello@junhaestudio.com"
                  className="mt-1 block text-green-800 hover:text-green-600 font-medium transition-colors"
                >
                  hello@junhaestudio.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Studio Hours</h3>
                <p className="mt-2 text-gray-600">
                  We’re based in Karachi, creating slow fashion with fast
                  hearts.
                </p>
                <p className="mt-1 text-gray-600">Mon–Fri, 10AM–6PM (PKT)</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Find us elsewhere
                </h3>
                <p className="mt-2 text-gray-600">
                  Follow our journey. Wear your story.
                </p>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="#"
                    className="text-gray-800 hover:text-gray-500 transition-colors"
                  >
                    <span className="sr-only">Instagram</span>
                    <InstagramIcon />
                  </a>
                  <a
                    href="#"
                    className="text-gray-800 hover:text-gray-500 transition-colors"
                  >
                    <span className="sr-only">TikTok</span>
                    <TikTokIcon />
                  </a>
                  <a
                    href="#"
                    className="text-gray-800 hover:text-gray-500 transition-colors"
                  >
                    <span className="sr-only">Pinterest</span>
                    <PinterestIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
