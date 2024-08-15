import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarrr from "./SideBarrr";
import { UserContext } from "../context/contextApi";
import Dashboardbg from "../assets/dashboardbg.png";
import logo from "../assets/logo.png";

export default function Dashboard() {
  const navigate = useNavigate();
  const [openBar, setOpenBar] = useState(false);
  const { userRole } = useContext(UserContext);
  console.log("user role in dashboard is " + userRole);
  const data = [
    {
      id: 1,
      name: "Detect Cancer",
      description: "This bot will help you with your finance-related issues",
    },
    {
      id: 2,
      name: "Upload Image",
      description: "This bot will help you with your insurance-related issues",
    },
    {
      id: 3,
      name: "Generic Assistant",
      description: "This bot will help you with general issues",
    },
  ];

  function handleTemplate(id) {
    console.log("user role in handle template " + userRole);
    navigate(userRole === true ? `/UploadFile/${id}` : `/P/${id}`);
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
        // alert("Error in stripe checkout");
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
  return (
    <div>
      <div className="flex  overflow-hidden text-White w-full">
        <SideBarrr openBar={openBar} setOpenBar={setOpenBar} />
        <div className="shadowb absolute top-14   h-[90vh] w-full "></div>
        <div
          className=" hidden md:block absolute bg-center bg-cover bg-no-repeat min-h-screen right-0 -z-20 mr-auto   w-5/12"
          style={{
            backgroundImage: `url(${Dashboardbg})`,
          }}
        ></div>

        <div
          className={`flex overflow-auto w-full sha transition-all duration-300 ${
            openBar ? "ml-48" : "ml-10"
          }`}
        >
          {openBar && (
            <div className="w-[100vw]  fixed h-full  top-0 bg-black bg-opacity-75 md:hidden "></div>
          )}

          <div className="bg-background text-White min-h-screen w-full flex flex-col items-start p-6">
            <div onClick={() => navigate("/Dashboard")} className="flex ">
              <img src={logo} className="h-7 w-7 m-2" alt="Logo" />
              <h1 className="font-bold text-base sm:text-2xl text-white m-1">
                Skin-Guardian
              </h1>
            </div>

            <div className=" my-10 mx-5 sm:mx-8 sm:my-20 sm:mt-24">
              <h2 className=" text-[2.2rem] font-bold md:text-[3.5rem] tracking-[0.65rem] md:font-semibold mb-3">
                Expert
                <span> financial</span>
              </h2>
              <h2 className=" text-[2.2rem] font-bold md:text-[3.5rem] tracking-[0.65rem] md:font-semibold mb-3">
                guidance,
              </h2>
              <h2 className=" text-[2.2rem] font-bold md:text-[3.5rem] tracking-[0.65rem] md:font-semibold mb-3">
                interactively. {userRole}
              </h2>
              {userRole === true ? (
                <button
                  onClick={handlePremium}
                  className=" py-2 px-4 border rounded-full mt-9 mb-5 "
                >
                  Upgrade to Premium
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col justify-center w-full text-2xl  md:text-4xl font-semibold ">
              <h1 className=" mx-auto my-4">
                Choose Your Assistant to continue
              </h1>
              <div className="flex justify-center my-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-8 w-8 animated-move-down"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                  />
                </svg>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-6 md:gap-14 my-12 ">
              {data.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleTemplate(item.id)}
                  className="mx-2 p-6 flex  bg-[#0C100E] rounded-lg shadow-lg"
                >
                  <div className=" ">
                    <h3 className=" text-lg sm:text-xl font-semibold mb-2">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  <div className=" flex flex-col justify-center ml-2 items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-9 w-9"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SideBarrr from "./SideBarrr";
// import { UserContext } from "../context/contextApi";
// import Dashboardbg from "../assets/dashboardbg.png";
// import logo from "../assets/logo.png";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [openBar, setOpenBar] = useState(false);
//   const { userRole } = useContext(UserContext);
//   console.log(userRole);
//   const data = [
//     {
//       id: 1,
//       name: "Financial Assistant",
//       description: "This bot will help you with your finance-related issues",
//     },
//     {
//       id: 2,
//       name: "Insurance Assistant",
//       description: "This bot will help you with your insurance-related issues",
//     },
//     {
//       id: 3,
//       name: "Generic Assistant",
//       description: "This bot will help you with general issues",
//     },
//   ];

//   function handleTemplate(id) {
//     console.log("user role in handle template " + userRole);
//     navigate(userRole ? `/UploadFile/${id}` : `/P/${id}`);
//   }
//   return (
//     <div>
//       <div className="flex  overflow-hidden text-White w-full">
//         <SideBarrr openBar={openBar} setOpenBar={setOpenBar} />
//         <div className="shadowb absolute top-14  h-[90vh] w-full "></div>

//         <div
//           className={`flex overflow-auto w-full sha transition-all duration-300 ${
//             openBar ? "ml-48" : "ml-10"
//           }`}
//         >
//           <div class="bg-background text-White min-h-screen w-full flex flex-col items-start p-6">
//             <div onClick={() => navigate("/Dashboard")} className="flex ">
//               <img src={logo} className="h-7 w-7 m-2" alt="Logo" />
//               <h1 className="font-bold text-base sm:text-2xl text-white m-1">
//                 Skin-Guardian
//               </h1>
//             </div>

//             <div className=" my-10 mx-5 sm:mx-8 sm:my-24">
//               <h2 class="text-6xl tracking-[0.65rem] font-semibold mb-3">
//                 Expert financial
//               </h2>
//               <h2 class="text-6xl tracking-[0.65rem] font-semibold mb-3">
//                 guidance,
//               </h2>
//               <h2 class="text-6xl tracking-[0.65rem] font-semibold mb-3">
//                 interactively.
//               </h2>
//               {userRole ? (
//                 <button class=" py-2 px-4 border rounded-full mt-9 mb-5 ">
//                   Upgrade to Premium
//                 </button>
//               ) : (
//                 ""
//               )}
//             </div>
//             <div className="flex justify-center w-full  text-4xl font-semibold ">
//               <h1 className=" mx-auto my-4">
//                 Choose Your Assistant to continue
//               </h1>
//             </div>

//             <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-6 md:gap-14 my-5 ">
//               {data.map((item) => (
//                 <div
//                   key={item.id}
//                   onClick={() => handleTemplate(item.id)}
//                   className="mx-2 p-6 flex  bg-[#0C100E] rounded-lg shadow-lg"
//                 >
//                   <div className=" ">
//                     <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
//                     <p className="text-muted-foreground">{item.description}</p>
//                   </div>
//                   <div className=" flex flex-col justify-center ml-2 items-center ">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke-width="1.5"
//                       stroke="currentColor"
//                       className="h-9 w-9"
//                     >
//                       <path
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                         d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
