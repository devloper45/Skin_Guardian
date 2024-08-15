import React from "react";

import bgImage from "../assets/bg.png";
import VectorHome from "../assets/vectorhome.png";

import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="min-h-screen"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Navbar />
        <div className=" h-[90vh] flex flex-col justify-center items-center">
          {/* bg-gradient-radial from-[#1E2C26] via-gray-200 to-gray-900 */}
          <div className="max-w-screen-xl mx-auto px-5">
            <div className="flex justify-center items-center my-3 ">
              <div className="text-white mt-10 sm:mt-20 md:mt-[10vh] lg:mt-1 md:m-3 md:my-1 md:w-2/3 ">
                <div className=" flex ">
                  <h1 className="text-xl sm:text-3xl md:text-5xl tracking-[0.65rem]  font-bold mt-4 ">
                    Expert
                  </h1>
                  <img
                    src={VectorHome}
                    alt=""
                    srcset=""
                    className="h-6 w-36 sm:w-72 ml-4 mt-5 sm:mt-8"
                  />
                </div>
                <h1 className="text-xl sm:text-3xl md:text-5xl font-bold tracking-[0.65rem] mb-8">
                  Skin Guardian
                </h1>

                <p className="text-base md:text-lg max-w-xl  mb-12">
                  
                  Streamline your finances with FinancialBase: upload documents
                  securely and get real-time AI-powered guidance on budgeting,
                  tax planning, and investments.
                </p>
                <div className="flex  ">
                  <button
                    className="my-2 text-center bg-white p-2 px-4 rounded-3xl text-[#061539] font-medium text-lg;"
                    onClick={() => navigate("/Signup")}
                  >
                    Start For Free
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
