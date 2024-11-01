import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TimePicker, Select } from "antd";
import dayjs from "dayjs";
import BacktoHome from "../../utils/BacktoHome";

const dayOptions = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];

const specializationOptions = [
  { label: "MBBS", value: "MBBS" },
  { label: "Cancer Specialist", value: "Cancer Specialist" },
  { label: "Radiologist", value: "Radiologist" },
  { label: "Dermatologist", value: "Dermatologist" },
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
    specilization: [],
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
      const response = await fetch(
        "https://fyp-production-c71f.up.railway.app/v1/api/docter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputValue),
        }
      );

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
    setInputValue((prev) => ({ ...prev, specilization: value }));
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
            {/* <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Specialization
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
              onChange={handleSpecializationChange}
              options={specializationOptions}
            />
          </div> */}
            <InputField
              label="Services"
              name="services"
              type="text"
              placeholder="Enter Services"
              value={inputValue.services}
              onChange={onChangeHandler}
            />
            <InputField
              label="Education"
              name="education"
              type="text"
              placeholder="Enter Last Education"
              value={inputValue.education}
              onChange={onChangeHandler}
            />
          </div>

          <div className="mt-12 flex justify-center">
            <button
              type="submit"
              className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const InputField = ({ label, name, type, placeholder, value, onChange }) => (
  <div>
    <label className="text-gray-800 text-sm mb-2 block">{label}</label>
    <input
      name={name}
      type={type}
      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
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
          ? [dayjs(value[0], "HH:mm"), dayjs(value[1], "HH:mm")]
          : null
      }
      format="HH:mm"
    />
  </div>
);

export default SignUpDocter;

// import Password from "antd/es/input/Password";
// import React, { useState } from "react";
// // import validation from "../Validiation"; // Import your validation function
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// import { TimePicker } from "antd";
// // import OptionBG from "../../assets/Optionbg.png";

// function SignUpDocter() {
//   // const [error, setError] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [inputValue, setInputValue] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phoneNumber: "",
//     specilization: "",
//     availableDays: "",
//     availableTimeSlots: "",
//     services: "",
//     education: "",
//   });

//   const navigate = useNavigate();

//   // OnChangeHandler
//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setInputValue((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDocterSignup = async (event) => {
//     event.preventDefault();

//     try {
//       const url = `${ApiBaseUrl}/user`;
//       const response = await fetch(
//         "https://fyp-production-c71f.up.railway.app/v1/api/docter",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(inputValue),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Sign-up request failed");
//       }

//       const result = await response.json();
//       console.log("Sign-up successful:", result);

//       navigate("/Login"); // Redirect to login page after successful signup
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("An error occurred while signing up.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
//       <div className="text-center mb-16">
//         <h2>Skin Guardian</h2>
//         <h4 className="text-gray-800 text-base font-semibold mt-6">
//           Sign up As Docter
//         </h4>
//       </div>

//       <form onSubmit={handleDocterSignup}>
//         <div className="grid sm:grid-cols-2 gap-8">
//           <div>
//             <label className="text-gray-800 text-sm mb-2 block">
//               First Name
//             </label>
//             <input
//               name="firstName"
//               type="text"
//               className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//               placeholder="Enter First Name"
//               value={inputValue.firstName}
//               onChange={onChangeHandler}
//             />
//           </div>
//           <div>
//             <label className="text-gray-800 text-sm mb-2 block">
//               Last Name
//             </label>
//             <input
//               name="lastName"
//               type="text"
//               className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//               placeholder="Enter last name"
//               value={inputValue.lastName}
//               onChange={onChangeHandler}
//             />
//           </div>
//           <div>
//             <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
//             <input
//               name="email"
//               type="email"
//               className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//               placeholder="Enter email"
//               value={inputValue.email}
//               onChange={onChangeHandler}
//             />
//           </div>
//           <div>
//             <label className="text-gray-800 text-sm mb-2 block">
//               Mobile No.
//             </label>
//             <input
//               name="phoneNumber"
//               type="number"
//               className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//               placeholder="Enter mobile number"
//               value={inputValue.phoneNumber}
//               onChange={onChangeHandler}
//             />
//           </div>
//           <div>
//             <label className="text-gray-800 text-sm mb-2 block">Password</label>
//             <input
//               name="password"
//               type="password"
//               className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//               placeholder="Enter password"
//               value={inputValue.password}
//               onChange={onChangeHandler}
//             />
//           </div>
//           <div>
//             <label className="text-gray-800 text-sm mb-2 block">
//               Confirm Password
//             </label>
//             <input
//               name="confirmPassword"
//               type="password"
//               className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//               placeholder="Enter confirm password"
//               value={inputValue.confirmPassword}
//               onChange={onChangeHandler}
//             />
//           </div>
//           <div>
//             <label className="text-gray-800 text-sm mb-2 block">
//               Specilization
//             </label>
//             <input
//               name="specilization"
//               type="text"
//               className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//               placeholder="Enter confirm password"
//               value={inputValue.specilization}
//               onChange={onChangeHandler}
//             />
//           </div>
//           <div>
//             <label className="text-gray-800 text-sm mb-2 block">
//               Available Days
//             </label>
//             <input
//               name="availableDays"
//               type="text"
//               className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//               placeholder="Enter confirm password"
//               value={inputValue.availableDays}
//               onChange={onChangeHandler}
//             />
//           </div>
//           <div>
//             <label className="text-gray-800 text-sm mb-2 block">
//               Available Time Slots
//             </label>

//             <div class="w-[16rem]">
//               <button
//                 id="selectTimeToggle"
//                 data-collapse-toggle="time-range-container"
//                 type="button"
//                 class="text-blue-700 dark:text-blue-500 text-base font-medium hover:underline p-0 inline-flex items-center mb-2"
//               >
//                 Available Time Slots{" "}
//                 <svg
//                   class="w-8 h-8 ms-0.5"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     stroke="currentColor"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="m8 10 4 4 4-4"
//                   />
//                 </svg>
//               </button>
//               <div
//                 id="time-range-container"
//                 class="max-w-[16rem] mx-auto grid grid-cols-2 gap-4 mb-2"
//               >
//                 <div>
//                   <label
//                     for="start-time"
//                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Start time:
//                   </label>
//                   <div class="relative">
//                     <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
//                       <svg
//                         class="w-4 h-4 text-gray-500 dark:text-gray-400"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           fill-rule="evenodd"
//                           d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
//                           clip-rule="evenodd"
//                         />
//                       </svg>
//                     </div>
//                     <input
//                       type="time"
//                       id="start-time"
//                       class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       min="09:00"
//                       max="18:00"
//                       value="00:00"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label
//                     for="end-time"
//                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     End time:
//                   </label>
//                   <div class="relative">
//                     <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
//                       <svg
//                         class="w-4 h-4 text-gray-500 dark:text-gray-400"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           fill-rule="evenodd"
//                           d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
//                           clip-rule="evenodd"
//                         />
//                       </svg>
//                     </div>
//                     <input
//                       type="time"
//                       id="end-time"
//                       class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       min="09:00"
//                       max="18:00"
//                       value="00:00"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//           <div>
//             <label className="text-gray-800 text-sm mb-2 block">Services</label>
//             <input
//               name="services"
//               type="text"
//               className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//               placeholder="Enter services"
//               value={inputValue.services}
//               onChange={onChangeHandler}
//             />
//           </div>
//           <div>
//             <label className="text-gray-800 text-sm mb-2 block">
//               Education
//             </label>
//             <input
//               name="education"
//               type="text"
//               className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//               placeholder="Enter Last Education"
//               value={inputValue.education}
//               onChange={onChangeHandler}
//             />
//           </div>
//           <div>
//             <TimePicker.RangePicker />
//           </div>
//         </div>

//         <div className="!mt-12 flex justify-center ">
//           <button
//             type="button"
//             className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"

//           >
//             Sign up
//           </button>
//         </div>
//       </form>
//     </div>

//   );
// }

// export default SignUpDocter;
