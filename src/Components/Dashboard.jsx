import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarrr from "./SideBarrr";
import { UserContext } from "../context/contextApi";
import Dashboardbg from "../assets/bg.avif";
import Navbarr from "./Navbarr";

// import UploadFileTemplate from "./UploadFileTemplate";
// import logo from "../assets/logo.png";

export default function Dashboard() {
  const navigate = useNavigate();
  const [openModel, setOpenModel] = useState(false);
  const { userRole } = useContext(UserContext);
  console.log("user role in dashboard is " + userRole);

  function handleTemplate(path) {
    console.log("user role in handle template " + userRole);
    navigate(path);
  }

  async function handlePremium() {
    const stripeid = localStorage.getItem("stripeid");
    try {
      const premiumResponse = await fetch(
        `http://127.0.0.1:8000/stripe-checkout/${stripeid}/`,
        {
          method: "GET",
        }
      );

      if (!premiumResponse.ok) {
        throw new Error("Premium subscription request failed");
      } else {
        localStorage.setItem("userRole", false);
      }
      console.log(premiumResponse);

      const result2 = await premiumResponse.json();

      if (!result2?.url) {
        toast.error("Error in stripe checkout");
      }

      console.log("Premium subscription successful:", result2);
      alert("Check your email for confirmation and premium benefits.");
      window.location = result2.url;
    } catch (error) {
      console.error("Error with premium subscription:", error);
      alert("An error occurred with premium subscription.");
    }
  }
  console.log(openModel);
  return (
    <>
      <Navbarr />

      <div className="flex    overflow-hidden text-White w-full">
        <div
          className={`flex overflow-auto w-full  transition-all duration-300`}
        >
          <div className="bg-background text-White  flex flex-col items-start p-6  bg-center bg-cover bg-no-repeat min-h-screen w-full">
            <section className=" dark:bg-gray-900">
              <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <h1 className="mb-4 text-4xl mx-28 px-5  font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                  AI-Powered Skin Cancer Detection and Wellness Recommendations
                </h1>
                <p className="mb-8 text-lg  mt-12 font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                  Upload your photo for an AI-based analysis. Our system will
                  check for signs of skin cancer. If you're clear, we'll
                  recommend top skin wellness products. If there's a concern,
                  you'll be directed to consult with one of our skin cancer
                  specialists.
                </p>
                <button
                  onClick={handlePremium}
                  className=" py-2 px-4 border rounded-full mt-9 mb-5 "
                >
                  Upgrade to Premium
                </button>
              </div>
            </section>

            <div className="flex flex-col justify-center w-full text-2xl  md:text-4xl font-semibold ">
              <h1 className=" mx-auto my-4">Choose Your Option to continue</h1>
              <div className="flex justify-center z-0 my-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-8 w-8 animated-move-down"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-6 md:gap-14 my-12 ">
              {/* Item 1 */}
              <div
                onClick={() => alert("Feature Coming Soon!")}
                className="mx-2 p-6 flex bg-[#77ccee] rounded-lg shadow-lg"
              >
                <div>
                  <h3 className=" text-lg sm:text-xl font-semibold mb-2">
                    Consult Dermatologist
                  </h3>
                  <p className="text-muted-foreground">
                    Take Consultation from Professional Dermatologist regarding
                    your Skin Wellness
                  </p>
                </div>
                <div className=" flex flex-col justify-center ml-2 items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-9 w-9"
                  >
                    <path
                      strokeLinecap="round"
                      stroke-linejoin="round"
                      d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
              </div>

              {/* Item 2 */}
              <div
                onClick={() => handleTemplate("/uploadImage")}
                className="mx-2 cursor-pointer p-6 flex bg-[#77ccee] rounded-lg shadow-lg"
              >
                <div>
                  <h3 className=" text-lg  sm:text-xl font-semibold mb-2">
                    Take or Upload Image
                  </h3>
                  <p className="text-muted-foreground">
                    Upload your image to analyze whether you have a chance of
                    skin cancer or not
                  </p>
                </div>
                <div className=" flex flex-col justify-center ml-2 items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-9 w-9"
                  >
                    <path
                      strokeLinecap="round"
                      stroke-linejoin="round"
                      d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
              </div>

              {/* Item 3 */}
              <div
                onClick={() => handleTemplate("/ConsultCancerDocter")}
                className="mx-2 p-6 flex bg-[#77ccee] rounded-lg shadow-lg"
              >
                <div>
                  <h3 className=" text-lg sm:text-xl font-semibold mb-2">
                    Consult Cancer Specialist
                  </h3>
                  <p className="text-muted-foreground">
                    Take consultation from a professional cancer specialist
                    regarding your skin wellness
                  </p>
                </div>
                <div className=" flex flex-col justify-center ml-2 items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-9 w-9"
                  >
                    <path
                      strokeLinecap="round"
                      stroke-linejoin="round"
                      d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
