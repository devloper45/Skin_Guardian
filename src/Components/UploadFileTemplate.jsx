import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/contextApi";
import bin from "../assets/bin.png"; // Ensure the correct path to the image
import OptionBG from "../assets/Optionbg.png";

export default function UploadFileTemplate() {
  const navigate = useNavigate();
  const { userRole } = useContext(UserContext);

  const data = [
    {
      id: 1,
      name: "Upload Photo",
      description: "This bot will help you with your finance-related issues",
      image: bin,
    },
    {
      id: 2,
      name: "Insurance Assistant",
      description: "This bot will help you with your insurance-related issues",
      image: bin,
    },
    {
      id: 3,
      name: "Generic Assistant",
      description: "This bot will help you with general issues",
      image: bin,
    },
  ];

  function handleTemplate(id) {
    console.log("user role in handle template " + userRole);
    navigate(userRole === true ? `/UploadFile/${id}` : `/P/${id}`);
  }

  return (
    <div
      className="flex justify-center items-center bg-cover bg-no-repeat bg-center h-[100vh]"
      style={{ backgroundImage: `url(${OptionBG})` }}
    >
      <div className="grid w-7/12 gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
  );
}
