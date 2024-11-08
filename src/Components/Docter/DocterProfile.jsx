import React, { useState } from "react";
import SideBarrr from "../SideBarrr";

export default function DocterProfile() {
  const [openBar, setOpenBar] = useState(false);
  return (
    <div className="flex flex-row w-full">
      <div className={`flex h-screen overflow-hidden w-full `}>
        <SideBarrr openBar={openBar} setOpenBar={setOpenBar} />
        <div
          className={`flex-1 overflow-auto w-full transition-all  duration-300 ${
            openBar ? "ml-52" : "ml-10"
          }`}
        >
          {openBar && (
            <div className="w-[100vw]  fixed h-full  top-0 bg-black bg-opacity-85 md:hidden "></div>
          )}
          <div className=" mx-7">
            <div className=" flex w-full  justify-center">
              <h1 className=" text-4xl  font-bold ">Doctor Profile</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
