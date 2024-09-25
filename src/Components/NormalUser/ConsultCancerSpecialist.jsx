import React from "react";
import Navbar from "../Navbar";
import Navbarr from "../Navbarr";

const doctors = [
  {
    name: "Dr. Lubna Rafique",
    title: "PLATINUM DOCTOR",
    specialty: "Dermatologist, Cosmetologist",
    qualifications: "MBBS, MCPS (Dermatolog)",
    waitTime: "Under 15 Min",
    experience: "9 Years",
    satisfaction: "100% (97)",
    consultationType: "Online Video Consultation (Online)",
    availability: "Available today",
    fee: "Rs. 1,400",
  },
  {
    name: "Dr. Sippy Iqbal",
    title: "PLATINUM DOCTOR",
    specialty: "Dermatologist, Cosmetologist",
    qualifications: "M.B.B.S, Diploma D-Derm",
    waitTime: "Under 15 Min",
    experience: "7 Years",
    satisfaction: "99% (388)",
    consultationType: "oladoc Care Video Consultation (Online)",
    availability: "Available today",
    fee: "Rs. 1,500",
  },
  {
    name: "Dr. Sadaf Khalid",
    title: "PLATINUM DOCTOR",
    specialty: "Dermatologist, Cosmetologist",
    qualifications: "M.B.B.S, F.C.P.S. (Dermatology)",
    waitTime: "15-30 Min",
    experience: "4 Years",
    satisfaction: "100% (49)",
    consultationType: "oladoc Care Video Consultation (Online)",
    availability: "Online",
    fee: "Rs. 1,400",
  },
];

const DoctorCard = ({ doctor }) => (
  <div className="bg-[#edf2f3] dark:bg-card rounded-lg shadow-xl p-4 flex justify-between items-start">
    <div className="flex items-center">
      <img
        src="https://placehold.co/100x100"
        alt={doctor.name}
        className="rounded-full mr-4"
      />
      <div>
        <h2 className="text-lg font-bold">
          {doctor.name} <span className="text-yellow-500">{doctor.title}</span>
        </h2>
        <p className="text-muted-foreground">
          {doctor.specialty}
          <br />
          {doctor.qualifications}
        </p>
        <p className="text-muted-foreground">
          {doctor.waitTime} | {doctor.experience} | {doctor.satisfaction}{" "}
          Satisfied Patients
        </p>
        <p className="font-semibold">{doctor.consultationType}</p>
        <p className="text-muted-foreground">{doctor.availability}</p>
      </div>
    </div>
    <div className="flex flex-col justify-between">
      <button className="bg-secondary btn text-secondary-foreground hover:bg-secondary/80 mt-2">
        Video Consultation
      </button>
      <button className="bg-primary btn text-primary-foreground hover:bg-primary/80 mt-2">
        Book Appointment
      </button>
      <p className="text-muted-foreground">{doctor.fee}</p>
    </div>
  </div>
);

const ConsultCancerSpecialist = () => (
  <>
    <Navbarr />
    <header className="bg-gray-100 p-6 shadow-md">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold m-4  text-gray-800">
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
        {doctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>
    </div>
  </>
);

export default ConsultCancerSpecialist;
