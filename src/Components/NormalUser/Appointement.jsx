import React, { useEffect, useRef, useState } from "react";
import { useCloseRef } from "../../hooks/useCloseRef";
import toast from "react-hot-toast";
import Api from "../ProtectRoute/Api";

export default function Appointement({ setOpenAppointementModel, docter }) {
  const [doctorr, setDocter] = useState("");
  const [nextTenDates, setNextTenDates] = useState([]);
  const [timeSlot, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectDateTime, setSelectDateTime] = useState(false);

  const AppointementModeRef = useRef(null);
  useCloseRef(AppointementModeRef, setOpenAppointementModel);

  async function handleApointment(time) {
    try {
      const response = await Api.post(`/appointment`, {
        appointmentDate: selectedDate,
        timeSlot: time,
        doctorId: docter.id,
      });
      console.log("hello response : ", response);
      toast.success("Appointment booked successfully");
      setOpenAppointementModel(false);
    } catch (error) {
      toast.error("Failed to book appointment. Please try again.");
    }
  }

  useEffect(() => {
    async function handleDocterDetail() {
      setDocter(docter);
      await Api.get(`/doctor/${docter.id}`);
    }

    function generateNextTenDates() {
      const dates = [];
      const today = new Date();
      for (let i = 0; i < 10; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        dates.push(futureDate.toISOString().split("T")[0]);
      }
      setNextTenDates(dates);
    }

    generateNextTenDates();
    handleDocterDetail();
  }, [docter]);

  async function handleTimeApi(date) {
    try {
      const response = await Api.get(`/doctor/time/${docter.id}/${date}`);
      const timeSlots = response.data.data;
      setTimeSlots(timeSlots);
      setSelectedDate(date);
      setSelectDateTime(true);
    } catch (error) {
      toast.error("Failed to fetch available time slots.");
    }
  }

  return (
    <div className="bg-black/70 z-20 flex justify-center items-center top-0 left-0 absolute w-full h-full">
      <div
        ref={AppointementModeRef}
        className="flex flex-col bg-white rounded-lg h-auto w-9/12 relative p-6"
      >
        <div className="mx-auto p-6 bg-card rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            {doctorr.profilePic ? (
              <img
                src={doctorr.profilePic}
                alt=""
                srcset=""
                className="rounded-full mr-4 h-36 w-36 object-cover "
              />
            ) : (
              <img
                src="https://placehold.co/100x100"
                alt="Doctor Profile"
                className="rounded-full mr-4 "
              />
            )}
            <div>
              <h2 className="text-xl font-bold">
                Dr. {doctorr.firstName} {doctorr.lastName}
              </h2>
              <p className="text-muted-foreground">
                Skin Guardian Video Consultation (Online)
              </p>
              <p className="text-primary">Fee: Rs. 1,500</p>
              <p className="">
                Contact No. :{" "}
                <span className=" hover:underline text-primary ">
                  {doctorr.phoneNumber}
                </span>
              </p>
              <p className="">
                Clinic Address :{" "}
                <span className=" hover:underline text-primary ">
                  {doctorr.clinicAddress}
                </span>
              </p>
            </div>
          </div>
          

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Select Date</h3>
            <div className="flex space-x-2 mt-2">
              {nextTenDates.map((date, index) => (
                <button
                  key={index}
                  className="px-4 py-2 border rounded hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleTimeApi(date)}
                >
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Available Slots</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
              {selectDateTime ? (
                timeSlot.length > 0 ? (
                  timeSlot.map((time, idx) => (
                    <button
                      key={idx}
                      className="bg-blue-200 text-black py-2 rounded"
                      onClick={() => handleApointment(time)}
                    >
                      {time}
                    </button>
                  ))
                ) : (
                  <p className="text-red-500">No Time Slot Available</p>
                )
              ) : (
                <p className="text-gray-500">Please select a date first</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
