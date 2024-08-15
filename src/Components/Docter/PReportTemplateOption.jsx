import React from "react";
import { useNavigate } from "react-router-dom";
import bin from "../../assets/bin.png"; // Ensure the correct path to the image
import OptionBG from "../../assets/Optionbg.png";

export default function PReportTemplateOption() {
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      name: "Monthly Report",
      description: "This bot will help you with your finance-related issues",
      image: bin,
    },
    {
      id: 2,
      name: "Quarterly Report",
      description: "This bot will help you with your insurance-related issues",
      image: bin,
    },
    {
      id: 3,
      name: "Anuual Report",
      description: "This bot will help you with general issues",
      image: bin,
    },
  ];

  function handleTemplate(id) {
    navigate(`/PReportTemplate/${id}`);
  }

  return (
    <>
      <div className="relative left-0 top-0 m-10 -mb-48 text-white">
        <h1 className="text-[24px]">Welcome !</h1>
        <div>
          <img src="" alt="" />
          <h1></h1>
        </div>
        <p className=" text-[36px]">How can I help you today? </p>
      </div>
      <div
        className="flex justify-center items-center bg-center bg-cover bg-no-repeat min-h-screen"
        style={{
          backgroundImage: `url(${OptionBG})`,
        }}
      >
        <div className="grid mt-44 z-10 w-7/12 gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <div
              key={item.id}
              onClick={() => handleTemplate(item.id)}
              className="bg-[#171C19] p-3 rounded-2xl flex cursor-pointer items-center"
            >
              <div className="w-24 h-24 flex-shrink-0 ">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-White flex flex-col justify-center items-start">
                <h1 className="text-base py-1 text-white font-bold">
                  {item.name}
                </h1>
                <p className="text-white text-[10px]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
