import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Navbarr from "../Navbarr";
import Appointement from "./Appointement";
import Api from "../ProtectRoute/Api";

async function getDoctersListFromBackend(setDoctors) {
  try {
    const response = await Api.get("/doctor");
    if (response.status >= 200 && response.status < 300) {
      console.log("Doctors fetched successfully!", response.data);
      setDoctors(response.data.data);
    } else {
      console.log("Failed to fetch doctors list");
    }
  } catch (error) {
    console.log("Error fetching doctors:", error);
  }
}

function handleDoctor(doctor, setDocter, setOpenAppointementModel) {
  console.log("Selected doctor:", doctor);
  setDocter(doctor);
  setOpenAppointementModel(true);
}

const DoctorCard = ({ doctor, setDocter, setOpenAppointementModel }) => (
  <div className="bg-[#edf2f3] dark:bg-card rounded-lg shadow-xl p-4 flex justify-between items-start">
    <div className="flex items-center">
      <img
        src="https://placehold.co/100x100"
        alt={doctor.firstName + " " + doctor.lastName}
        className="rounded-full mr-4"
      />
      <div>
        <h2 className="text-lg font-bold">
          {"Dr. " + doctor.firstName} {doctor.lastName}
        </h2>
        <p className="text-muted-foreground">
          {doctor.specialization.join(", ")}
          <br />
          {doctor.education.join(", ")}
        </p>
        <p className="text-muted-foreground">
          Experience: {doctor.experience || "N/A"} years | Satisfied Patients:{" "}
          {doctor.satisfaction || "N/A"}
        </p>
        <p className="font-semibold">Services: {doctor.services.join(", ")}</p>
      </div>
    </div>
    <div className="flex flex-col justify-between">
      <button className="bg-secondary btn text-secondary-foreground hover:bg-secondary/80 mt-2">
        Video Consultation
      </button>
      <button
        className="bg-primary btn text-primary-foreground hover:bg-primary/80 mt-2"
        onClick={() =>
          handleDoctor(doctor, setDocter, setOpenAppointementModel)
        }
      >
        Book Appointment
      </button>
    </div>
  </div>
);

function ConsultCancerSpecialist() {
  const [openAppointementModel, setOpenAppointementModel] = useState(false);
  const [docter, setDocter] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getDoctersListFromBackend(setDoctors);
  }, []);

  const indexOfLastDoctor = currentPage * itemsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - itemsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const totalPages = Math.ceil(doctors.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative min-h-screen">
      {openAppointementModel && docter && (
        <Appointement
          setOpenAppointementModel={setOpenAppointementModel}
          docter={docter}
        />
      )}
      <Navbarr />
      <header className="bg-gray-100 p-6 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold m-4 text-gray-800">
            Skin Cancer Specialists
          </h1>
          <p className="mt-2 m-6 text-gray-600">
            Find expert dermatologists and skin cancer specialists for
            consultations and treatments. Book an appointment or start a video
            consultation with the best doctors available.
          </p>
        </div>
      </header>
      <div className="container mx-auto p-4">
        <div id="doctor-list" className="space-y-4">
          {currentDoctors.length > 0 ? (
            currentDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                setDocter={setDocter}
                setOpenAppointementModel={setOpenAppointementModel}
              />
            ))
          ) : (
            <p className="m">Loading doctors...</p>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className=" mx-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 hover:size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className=" mx-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 hover:size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsultCancerSpecialist;

// import React, { useState, useEffect } from "react";
// import Navbar from "../Navbar";
// import Navbarr from "../Navbarr";
// import Appointement from "./Appointement";
// import Api from "../ProtectRoute/Api";

// async function getDoctersListFromBackend(setDoctors) {
//   try {
//     const response = await Api.get("/doctor");
//     if (response.status >= 200 && response.status < 300) {
//       console.log("Doctors fetched successfully!", response.data);
//       setDoctors(response.data.data);
//     } else {
//       console.log("Failed to fetch doctors list");
//     }
//   } catch (error) {
//     console.log("Error fetching doctors:", error);
//   }
// }

// // Update handleDoctor to set the selected doctor
// function handleDoctor(doctor, setDocter, setOpenAppointementModel) {
//   console.log("Selected doctor:", doctor);
//   setDocter(doctor); // set the selected doctor
//   setOpenAppointementModel(true); // open appointment model
// }

// const DoctorCard = ({ doctor, setDocter, setOpenAppointementModel }) => (
//   <div className="bg-[#edf2f3] dark:bg-card rounded-lg shadow-xl p-4 flex justify-between items-start">
//     <div className="flex items-center">
//       <img
//         src="https://placehold.co/100x100"
//         alt={doctor.firstName + " " + doctor.lastName}
//         className="rounded-full mr-4"
//       />
//       <div>
//         <h2 className="text-lg font-bold">
//           {doctor.firstName} {doctor.lastName}
//         </h2>
//         <p className="text-muted-foreground">
//           {doctor.specialization.join(", ")}
//           <br />
//           {doctor.education.join(", ")}
//         </p>
//         <p className="text-muted-foreground">
//           Experience: {doctor.experience || "N/A"} years | Satisfied Patients:{" "}
//           {doctor.satisfaction || "N/A"}
//         </p>
//         <p className="font-semibold">Services: {doctor.services.join(", ")}</p>
//       </div>
//     </div>
//     <div className="flex flex-col justify-between">
//       <button className="bg-secondary btn text-secondary-foreground hover:bg-secondary/80 mt-2">
//         Video Consultation
//       </button>
//       <button
//         className="bg-primary btn text-primary-foreground hover:bg-primary/80 mt-2"
//         onClick={() =>
//           handleDoctor(doctor, setDocter, setOpenAppointementModel)
//         }
//       >
//         Book Appointment
//       </button>
//     </div>
//   </div>
// );

// function ConsultCancerSpecialist() {
//   const [openAppointementModel, setOpenAppointementModel] = useState(false);
//   const [docter, setDocter] = useState(null); // current selected doctor
//   const [doctors, setDoctors] = useState([]); // list of doctors

//   useEffect(() => {
//     getDoctersListFromBackend(setDoctors);
//   }, []);

//   return (
//     <div className="relative min-h-screen">
//       {openAppointementModel && docter && (
//         <Appointement
//           setOpenAppointementModel={setOpenAppointementModel}
//           docter={docter} // pass selected doctor object
//         />
//       )}
//       <Navbarr />
//       <header className="bg-gray-100 p-6 shadow-md">
//         <div className="container mx-auto text-center">
//           <h1 className="text-3xl font-bold m-4 text-gray-800">
//             Skin Cancer Specialists
//           </h1>
//           <p className="mt-2 m-6 text-gray-600">
//             Find expert dermatologists and skin cancer specialists for
//             consultations and treatments. Book an appointment or start a video
//             consultation with the best doctors available.
//           </p>
//         </div>
//       </header>
//       <div className="container mx-auto p-4">
//         <div id="doctor-list" className="space-y-4">
//           {doctors.length > 0 ? (
//             doctors.map((doctor) => (
//               <DoctorCard
//                 key={doctor.id}
//                 doctor={doctor}
//                 setDocter={setDocter} // pass setDocter to update selected doctor
//                 setOpenAppointementModel={setOpenAppointementModel}
//               />
//             ))
//           ) : (
//             <p className="m">Loading doctors...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ConsultCancerSpecialist;
