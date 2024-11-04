import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TimePicker, Select } from "antd";
import dayjs from "dayjs";
import BacktoHome from "../../utils/BacktoHome";
import { ApiBaseUrl } from "../../utils/util";

const dayOptions = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];

const specializationOptions = [
  { label: "MBBS", value: "MBBS" },
  { label: "Cancer Specialist", value: "Cancer Specialist" },
  { label: "Radiologist", value: "Radiologist" },
  { label: "Dermatologist", value: "Dermatologist" },
];
const servicenOptions = [
  { label: "Dermatologist ", value: "Dermatologist" },
  { label: "Cancer Specialist ", value: "Cancer Specialist" },
  { label: "Radiologist ", value: "Radiologist" },
];
const EducationOptions = [
  { label: "MBBS", value: "MBBS" },
  { label: "MD", value: "MD" },
];

function SignUpDocter() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    specialization: [],
    availableDays: [],
    availableTimeSlots: [],
    services: [],
    education: [],
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleDocterSignup = async (event) => {
    event.preventDefault();
    try {
      const url = `${ApiBaseUrl}/doctor`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputValue),
      });

      if (!response.ok) throw new Error("Sign-up request failed");

      const result = await response.json();
      toast.success("Sign-up successful");
      navigate("/Login");
    } catch (error) {
      console.error("Error:", error);
      // toast.error("An error occurred while signing up.");
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

  return (
    <div className=" relative mx-auto bg-gray-50 font-[sans-serif] p-6">
      <BacktoHome />
      <div className="carddd py-5 px-5">
        <div className="text-center mb-16">
          <h2>Skin Guardian</h2>
          <h4 className="text-gray-800 text-base font-semibold mt-6">
            Register As Doctor
          </h4>
        </div>

        <form onSubmit={handleDocterSignup}>
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
            />
            <InputField
              label="Mobile No."
              name="phoneNumber"
              type="number"
              placeholder="Enter Mobile Number"
              value={inputValue.phoneNumber}
              onChange={onChangeHandler}
            />
            <PasswordField
              label="Password"
              name="password"
              placeholder="Enter Password"
              value={inputValue.password}
              onChange={onChangeHandler}
              showPassword={showPassword}
              toggleShowPassword={toggleShowPassword}
            />
            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={inputValue.confirmPassword}
              onChange={onChangeHandler}
              showPassword={showPassword}
              toggleShowPassword={toggleShowPassword}
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
              Sign up
            </button>
          </div>
          <p className="tag-line">
            Already have an account?
            <Link to="/loginDocter">
              <span className="text-White hover:underline">
                {" "}
                Login as a Docter
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const InputField = ({ label, name, type, placeholder, value, onChange }) => (
  <div>
    <label className="text-gray-800  text-sm mb-2 block">{label}</label>
    <input
      name={name}
      type={type}
      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

const PasswordField = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  showPassword,
  toggleShowPassword,
}) => (
  <div>
    <label className="text-gray-800 text-sm mb-2 block">{label}</label>
    <div className="relative">
      <input
        name={name}
        type={showPassword ? "text" : "password"}
        className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute inset-y-0 right-3 flex items-center"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  </div>
);

const TimePickerInput = ({ onTimeRangeChange, value }) => (
  <div>
    <label className="text-gray-800 text-sm mb-2 block">
      Available Time Slots
    </label>
    <TimePicker.RangePicker
      onChange={onTimeRangeChange}
      value={
        value.length === 2
          ? [dayjs(value[0], "HH-mm"), dayjs(value[1], "HH-mm")]
          : null
      }
      format="HH-mm"
    />
  </div>
);

export default SignUpDocter;
