import React from "react";

import bgImage from "../assets/bg.png";
import VectorHome from "../assets/vectorhome.png";

import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <div className=" h-[90vh] ">
          <div className="bg-white  min-h-screen ">
            <div className="lg:min-h-[560px] bg-blue-100 px-4 sm:px-10">
              <div className="max-w-7xl w-full mx-auto py-16">
                <div className="grid lg:grid-cols-2 justify-center items-center gap-10">
                  <div>
                    <h1 className="md:text-5xl text-4xl font-bold mb-6 md:!leading-[55px]">
                      AI-powered Skin Cancer Detection
                    </h1>
                    <p className="text-base leading-relaxed">
                      Upload a picture of your skin, and our AI will analyze it
                      for signs of skin cancer. Get instant results and
                      personalized recommendations.
                    </p>
                    <div
                      className="flex flex-wrap gap-y-4 gap-x-8 mt-8"
                      onClick={() => navigate("/login")}
                    >
                      <button className="bg-black hover:bg-[#222] text-white flex items-center transition-all font-semibold rounded-md px-5 py-4">
                        Get started
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[14px] fill-current ml-2"
                          viewBox="0 0 492.004 492.004"
                        >
                          <path
                            d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z"
                            data-original="#000000"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="max-lg:mt-12 h-full">
                    <img
                      src="https://readymadeui.com/analtsis.webp"
                      alt="banner img"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="px-4 sm:px-10 mt-28">
              <div className="max-w-7xl w-full mx-auto">
                <div className="grid md:grid-cols-2 items-center gap-10">
                  <div className="w-full h-full">
                    <img
                      src="https://readymadeui.com/team-image.webp"
                      alt="Premium Benefits"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="md:text-4xl text-3xl font-semibold mb-6">
                      Why Choose Our Platform?
                    </h2>
                    <p>
                      Get personalized skin care recommendations based on AI
                      analysis. Whether you need medical consultation or daily
                      skin care solutions, we are here to help.
                    </p>

                    <div className="mt-8">
                      <div className="flex items-center">
                        <img
                          src="https://readymadeui.com/profile_2.webp"
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="ml-4">
                          <h4 className="font-semibold text-base">John Doe</h4>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p>
                          Veniam proident aute magna anim excepteur et ex
                          consectetur velit ullamco veniam minim aute sit. Elit
                          occaecat officia et laboris Lorem minim.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="px-4 sm:px-10 mt-28">
              <div className="max-w-7xl w-full mx-auto">
                <div className="grid md:grid-cols-2 items-center gap-10">
                  <div className="w-full h-full">
                    <img
                      src="https://readymadeui.com/team-image.webp"
                      alt="Premium Benefits"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="md:text-4xl text-3xl font-semibold mb-6">
                      Why Choose Our Platform?
                    </h2>
                    <p>
                      Our AI-driven platform provides personalized skin care
                      recommendations based on advanced image analysis. Whether
                      you're seeking professional medical advice or everyday
                      skincare solutions, we offer a one-stop solution to meet
                      your needs.
                    </p>

                    <div className="mt-8">
                      <div className="flex items-center">
                        <img
                          src="https://readymadeui.com/profile_2.webp"
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="ml-4">
                          <h4 className="font-semibold text-base">
                            Dr. Gullam Abbas
                          </h4>
                          <p className="text-sm text-gray-600">Dermatologist</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p>
                          “This platform is a game-changer for skincare
                          enthusiasts and patients alike. The personalized
                          recommendations ensure everyone gets the care they
                          deserve.”
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-10 mt-28">
              <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 justify-center items-center gap-10">
                <div>
                  <h2 className="md:text-4xl text-3xl font-semibold mb-6">
                    100% Safe for You
                  </h2>
                  <p>
                    Using AI-based analysis, our platform ensures privacy and
                    safety for all users. Rest assured, your data is encrypted
                    and analyzed to deliver accurate, meaningful results
                    tailored to your skin's unique needs.
                  </p>
                  <button className="bg-black hover:bg-[#222] text-white flex items-center transition-all font-semibold rounded-md px-5 py-4 mt-8">
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[14px] fill-current ml-2"
                      viewBox="0 0 492.004 492.004"
                    >
                      <path d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z" />
                    </svg>
                  </button>
                </div>
                <div className="w-full h-full">
                  <img
                    src="https://readymadeui.com/login-image.webp"
                    alt="feature"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* <div className="mt-28 px-4 sm:px-10 bg-blue-100">
              <div className="min-h-[400px] relative h-full max-w-2xl mx-auto flex flex-col justify-center items-center text-center px-6 py-16">
                <h2 className="md:text-4xl text-3xl font-semibold mb-6">
                  Your work, everywhere you are
                </h2>
                <p>
                  Veniam proident aute magna anim excepteur et ex consectetur
                  velit ullamco veniam minim aute sit. Elit occaecat officia et
                  laboris Lorem minim. Officia do aliqua adipisicing ullamco in.
                  consectetur velit ullamco veniam minim aute sit.
                </p>
                <button className="bg-black hover:bg-[#222] text-white flex items-center transition-all font-semibold rounded-md px-5 py-4 mt-8">
                  Get started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[14px] fill-current ml-2"
                    viewBox="0 0 492.004 492.004"
                  >
                    <path
                      d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </button>
              </div>
            </div> */}

            <div className="px-4 sm:px-10 mt-28">
              <div className="max-w-7xl w-full mx-auto">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <h2 className="md:text-4xl text-3xl font-semibold mb-6">
                      What our happy client say
                    </h2>
                    <p>
                      Our clients are the heart of everything we do. Their words
                      inspire us to strive for excellence and deliver unmatched
                      experiences. Here's what they have to say about their
                      journey with us—stories of trust, satisfaction, and
                      success that motivate us every day.
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-10 mt-16">
                  <div>
                    <div className="flex items-center">
                      <img
                        src="https://readymadeui.com/team-1.webp"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="ml-4">
                        <h4 className="font-semibold">John Doe</h4>
                        <p className="mt-1 text-xs text-gray-400">
                          Founder of Rubik
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p>
                        The service was amazing. I got a consultant from one of
                        the senior consulatant regarding my skin care
                      </p>
                    </div>
                    <div className="flex space-x-2 mt-6">
                      <svg
                        className="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        className="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        className="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        className="w-5 fill-[#CED5D8]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        className="w-5 fill-[#CED5D8]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <img
                        src="https://readymadeui.com/team-2.webp"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="ml-4">
                        <h4 className="font-semibold">Mark Adair</h4>
                        <p className="mt-1 text-xs text-gray-400">
                          Founder of Alpha
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p>
                        The service was amazing. I never had to wait that long
                        for my product delivery. The web ui was friendly and
                        attractive, and the delivery was impressively prompt.
                      </p>
                    </div>
                    <div className="flex space-x-2 mt-6">
                      <svg
                        className="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        className="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        className="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        className="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        className="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <img
                        src="https://readymadeui.com/team-3.webp"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="ml-4">
                        <h4 className="font-semibold">Simon Konecki</h4>
                        <p className="mt-1 text-xs text-gray-400">
                          Founder of Labar
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p>
                        The service was amazing. it's AI Guard of Skin .this app
                        save me from lot of confusion regarding my skin health
                      </p>
                    </div>
                    <div className="flex space-x-2 mt-6">
                      <svg
                        className="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        className="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        className="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        className="w-5 fill-[#facc15]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        className="w-5 fill-[#CED5D8]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-28 px-4 sm:px-10">
              <div className="max-w-7xl mx-auto bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 py-16 px-6 relative">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="md:text-4xl text-3xl font-semibold mb-6 text-white">
                    Subscribe to Our Newsletter
                  </h2>
                  <div className="my-6">
                    <p className="text-white">
                      Subscribe to our newsletter and stay up to date with the
                      latest news, updates, and exclusive offers. Get valuable
                      insights. Join our community today!
                    </p>
                  </div>
                  <div className="max-w-2xl left-0 right-0 mx-auto w-full bg-white p-5 flex items-center shadow-lg absolute -bottom-10 rounded-md">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-gray-50 py-3.5 px-4 text-base focus:outline-none"
                    />
                    <button className="bg-black hover:bg-[#222] text-white flex items-center transition-all font-semibold px-5 py-4">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <footer className="mt-28">
              <div className="px-4 sm:px-10">
                <div className="grid max-sm:grid-cols-1 max-xl:grid-cols-2 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
                  <div className="xl:col-span-2">
                    <h1 className="text-4xl font-bold mb-3">Skin Guardian</h1>
                    <p className="mb-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean gravida, mi eu pulvinar cursus, sem elit interdum
                      mauris.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-6">Services</h4>
                    <ul className="space-y-4">
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="hover:text-blue-600 flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-[10px] -rotate-90"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                            ></path>
                          </svg>{" "}
                          Skin Cancer Detection
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="hover:text-blue-600 flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-[10px] -rotate-90"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                            ></path>
                          </svg>{" "}
                          Cancer Consultant Appointment
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="hover:text-blue-600 flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-[10px] -rotate-90"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                            ></path>
                          </svg>{" "}
                          Skin Care Product
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-6">Resources</h4>
                    <ul className="space-y-4">
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="hover:text-blue-600 flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-[10px] -rotate-90"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                            ></path>
                          </svg>{" "}
                          Webinars
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="hover:text-blue-600 flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-[10px] -rotate-90"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                            ></path>
                          </svg>{" "}
                          Ebooks
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="hover:text-blue-600 flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-[10px] -rotate-90"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                            ></path>
                          </svg>{" "}
                          Templates
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="hover:text-blue-600 flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-[10px] -rotate-90"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                            ></path>
                          </svg>{" "}
                          Tutorials
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-4">About Us</h4>
                    <ul className="space-y-4">
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="hover:text-blue-600 flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-[10px] -rotate-90"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                            ></path>
                          </svg>{" "}
                          Our Story
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="hover:text-blue-600 flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-[10px] -rotate-90"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                            ></path>
                          </svg>{" "}
                          Mission and Values
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="hover:text-blue-600 flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-[10px] -rotate-90"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                            ></path>
                          </svg>{" "}
                          Team
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="hover:text-blue-600 flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-[10px] -rotate-90"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                            ></path>
                          </svg>{" "}
                          Testimonials
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <hr className="my-6" />
              <p className="text-center mb-6">
                © 2023 SkinGuardian All Rights Reserved.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
