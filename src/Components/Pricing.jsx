import React from "react";
import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";

const sharedClasses = {
  primaryBtn:
    "bg-[#1A201D] text-primary-foreground px-4 py-2 border rounded-full",
  secondaryBtn: "bg-secondary text-secondary-foreground px-4 py-2 rounded-full",
  card: "relative bg-card p-6 mb-10 lg:mb-5  rounded-xl shadow-lg border border-[#5FAE86] border-2 h-[450px] w-[550.24px]shadow-2xl shadow-[#76D0A2] -skew-y-[7deg] sm:mx-10",
  absoluteTop:
    "absolute -top-5 w-52 text-center -right-5 transform z-10 border   bg-[#1A201D] text-2xl px-4 py-1 rounded-lg",
  textMuted: "text-muted-foreground",
};

const PricingCard = ({ title, plan, price, duration, description }) => {
  return (
    <div className={sharedClasses.card}>
      <div className={sharedClasses.absoluteTop}>{title}</div>
      <div className="skew-y-[7deg] text-center my-8">
        <h2 className="text-xl font-semibold mt-6">{plan}</h2>
        <p className="text-[3.1rem] font-bold mt-2">{price}</p>

        <span className="text-[1.3rem] font-normal text-[hsl(130,3%,40%)]">
          /{duration}
        </span>

        <p className={sharedClasses.textMuted + " mt-4"}>{description}</p>
      </div>
      <div className="flex justify-center">
        <button
          onClick={Navigate("/Signup")}
          className={sharedClasses.primaryBtn + " mt-6 "}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

function Pricing() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen  flex flex-col items-center justify-center text-white p-6">
        <div className="text-center md:m-10 ">
          <h1 className="text-3xl lg:text-5xl font-bold mb-2">
            Start for free, pick a plan later
          </h1>
          <p className={sharedClasses.textMuted + " mb-16"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod
            tempor
          </p>
        </div>
        {/* shadow class  */}
        <div className="shadowb absolute top-7 left-0 h-72 w-[800px] "></div>

        {/* <div className="flex space-x-4 mb-8">
          <button className={sharedClasses.primaryBtn}>Yearly</button>
          <button className={sharedClasses.secondaryBtn}>Monthly</button>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-14 px-5 my-6 ">
          <PricingCard
            title="Basic"
            plan=""
            price="Free"
            duration=""
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod tempor lorem, eget efficitur nisl."
          />
          <PricingCard
            title="Premium"
            plan="monthly"
            price="$29.99"
            duration="month"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod tempor lorem, eget efficitur nisl."
          />
          <PricingCard
            title="Pro"
            plan="Yearly"
            price="$19.99"
            duration="month"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod tempor lorem, eget efficitur nisl."
          />
        </div>
        <div
          className="absolute bottom-16 right-0 shadowb  h-64 border w-[500px] "
          // style={{ divStyle }}
        ></div>
      </div>
    </>
  );
}

export default Pricing;
