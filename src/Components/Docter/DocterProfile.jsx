import React, { useEffect, useState } from "react";

// import SideBarrr from "../SideBarrr";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Select } from "antd";

import TimePickerInput from "../../utils/TimePickerInput";

import InputField from "../../utils/InputField";
import {
  ApiBaseUrl,
  dayOptions,
  EducationOptions,
  servicenOptions,
  specializationOptions,
} from "../../utils/util";
import SideBar from "./SideBar";
import Headers from "./Headers";
import Api from "../ProtectRoute/Api";

export default function DocterProfile() {
  const [openBar, setOpenBar] = useState(false);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState();
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    specialization: "",
    clinicAddress: "",
    fees: "",
    availableDays: [],
    availableTimeSlots: [],
    services: [],
    education: [],
    profilePic: "",
  });

  const navigate = useNavigate();

  async function getProfile() {
    const token = localStorage.getItem("token");
    const doctorString = localStorage.getItem("doctor");

    try {
      setLoading(true);
      const doctor = JSON.parse(doctorString);

      const url = `/personal/doctor/details/${doctor.id}`;

      const response = await Api.get(url);
      // const data = await response.json();
      console.log("data : ", response.data.data.email);
      setInputValue(response.data.data);
      setLoading(false);
    } catch {
      console.log("from catch");
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };
  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const url = `/personal/doctor`;

      // Create a copy of inputValue excluding profilePic
      const { profilePic, id, email, ...dataToSend } = inputValue;
      const {
        specialization,
        education,
        updatedAt,
        createdAt,
        availableTimeSlots,
        ...dataaToSend
      } = dataToSend;

      const response = await Api.put(url, dataaToSend);

      if (!response.ok) throw new Error("Update request failed");
      setLoading(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Failed to update profile.");
    }
  };


  const onTimeRangeChange = (time, timeString) => {
    setInputValue((prev) => ({
      ...prev,
      availableTimeSlots: timeString,
    }));
  };

  const handleDayChange = (value) => {
    setInputValue((prev) => ({ ...prev, availableDays: value }));
  };

  const handleSpecializationChange = (value) => {
    setInputValue((prev) => ({ ...prev, specialization: value }));
  };
  const handleEducationChange = (value) => {
    setInputValue((prev) => ({ ...prev, education: value }));
  };
  const handleServiceChange = (value) => {
    setInputValue((prev) => ({ ...prev, services: value }));
  };
  const handleImageChange = async(event) => {
    const file = event.target.files[0];
    setInputValue((prev) => ({ ...prev, profilePic: file }));
    
    try {
      setLoading(true);
      const url = `/personal/doctor/profile`;

     

      const response = await Api.patch(url, inputValue.profilePic);

      if (!response.ok) throw new Error("Update request failed");
      setLoading(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Failed to update profile.");
    }
    
  };
  return (
    <div className="flex flex-row w-full">
      <div className={`flex h-screen overflow-hidden w-full `}>
        <SideBar openBar={openBar} setOpenBar={setOpenBar} />
        <div
          className={`flex-1 overflow-auto w-full bg-gray-50 transition-all  duration-300 ${
            openBar ? "ml-44" : "ml-16"
          }`}
        >
          {openBar && (
            <div className="w-[100vw]  fixed h-full  top-0 bg-black bg-opacity-85 md:hidden "></div>
          )}
          {/* <div className="w-full fixed "> */}
          <Headers />
          {/* </div> */}

          <div className=" mx-7 mt-16">
            <div className=" flex w-full  justify-center">
              <h1 className=" text-4xl my-5 font-bold ">Doctor Profile</h1>
            </div>
            <form onSubmit={handleProfileUpdate}>
              <div className="flex flex-row bg-white rounded-md shadow-md">
                <div className="flex md:h-[300px] md:m-5 md:w-72 justify-end items-end ">
                  <div className="text-center relative flex justify-center mb-16">
                    <div className=" w-48 h-48 bg-gray-300 relative rounded-full">
                      <img
                        src={
                          inputValue.profilePic
                            ? inputValue.profilePic
                            : "https://placehold.co/100x100"
                        }
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                      upload image
                      <input
                        type="file"
                        accept="image/*"
                        className=" hidden"
                        id="uploadprofile"
                        onChange={(e) => handleImageChange(e)}
                      />
                      <div className=" flex justify-center items-center  bg-gray-300 h-10 w-10 rounded-full absolute bottom-4 right-3  ">
                        <label htmlFor="uploadprofile">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-7 cursor-pointer  hover:text-gray-400  "
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                            />
                          </svg>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" w-full  flex justify-center">
                  <div className="carddd py-5 !shadow-none  !mx-8">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <InputField
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="Enter First Name"
                        value={inputValue.firstName}
                        onChange={onChangeHandler}
                      />
                      <InputField
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Enter Last Name"
                        value={inputValue.lastName}
                        onChange={onChangeHandler}
                      />
                      <InputField
                        label="Email Id"
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                        value={inputValue.email}
                        onChange={onChangeHandler}
                        disable
                      />
                      <InputField
                        label="Mobile No."
                        name="phoneNumber"
                        type="number"
                        placeholder="Enter Mobile Number"
                        value={inputValue.phoneNumber}
                        onChange={onChangeHandler}
                      />
                      <InputField
                        label="Clinic Address "
                        name="clinicAddress"
                        type="text"
                        placeholder="Enter Clinic Address"
                        value={inputValue.clinicAddress}
                        onChange={onChangeHandler}
                      />
                      <InputField
                        label="Doctor Fee "
                        name="fees"
                        type="text"
                        placeholder="fees"
                        value={inputValue.fees}
                        onChange={onChangeHandler}
                      />

                      <div>
                        <label className="text-gray-800 text-sm mb-2 block">
                          Specialization
                        </label>
                        <Select
                          mode="tags"
                          allowClear
                          value={inputValue.specilization}
                          style={{ width: "100%" }}
                          placeholder="Add your Specialization"
                          onChange={handleSpecializationChange}
                          options={specializationOptions}
                        />
                      </div>
                      <div>
                        <label className="text-gray-800 text-sm mb-2 block">
                          Available Days
                        </label>
                        <Select
                          mode="multiple"
                          allowClear
                          style={{ width: "100%" }}
                          placeholder="Please select available days"
                          onChange={handleDayChange}
                          options={dayOptions}
                          value={inputValue.availableDays}
                        />
                      </div>
                      <TimePickerInput
                        onTimeRangeChange={onTimeRangeChange}
                        value={inputValue.availableTimeSlots}
                      />
                      <div>
                        <label className="text-gray-800 text-sm mb-2 block">
                          Education
                        </label>
                        <Select
                          mode="tags"
                          allowClear
                          value={inputValue.education}
                          style={{ width: "100%" }}
                          placeholder="Add your Education"
                          onChange={handleEducationChange}
                          options={EducationOptions}
                        />
                      </div>
                      <div>
                        <label className="text-gray-800 text-sm mb-2 block">
                          Services
                        </label>
                        <Select
                          mode="tags"
                          allowClear
                          value={inputValue.services}
                          style={{ width: "100%" }}
                          placeholder="Add your Services"
                          onChange={handleServiceChange}
                          options={servicenOptions}
                        />
                      </div>
                    </div>

                    <div className="mt-12 flex justify-center">
                      <button
                        type="submit"
                        className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
