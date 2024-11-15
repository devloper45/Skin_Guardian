import React, { useEffect, useState } from "react";
import Api from "../ProtectRoute/Api";
import SideBarrr from "../SideBarrr";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state for data fetch
  const [openBar, setOpenBar] = useState(false);

  async function handleDoctorAppointment() {
    try {
      const response = await Api.get("/personal/doctor/appointments");
      if (response.status >= 200 && response.status < 300) {
        console.log("Appointments fetched successfully!", response.data);
        setAppointments(response.data.data);
      } else {
        console.log("Failed to fetch appointment list");
      }
    } catch (error) {
      console.log("Error fetching appointments:", error);
    } finally {
      setLoading(false); // Set loading to false after fetch attempt
    }
  }

  async function handleAppointmentCancel(appointmentId) {
    try {
      const response = await Api.put(
        `/personal/doctor/appointments/${appointmentId}`,
        {
          status: "cancelled",
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Appointment cancelled successfully!", response.data);

        // Update the local state to reflect the change
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === appointmentId
              ? { ...appointment, status: "cancelled" }
              : appointment
          )
        );
      } else {
        console.log("Failed to cancel appointment");
      }
    } catch (error) {
      console.log("Error cancelling appointment:", error);
    }
  }

  useEffect(() => {
    handleDoctorAppointment();
  }, []);

  return (
    <div className="flex flex-row w-full h-screen">
      {/* Sidebar */}
      <SideBarrr openBar={openBar} setOpenBar={setOpenBar} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          openBar ? "ml-52" : "ml-10"
        } overflow-auto`}
      >
        {openBar && (
          <div className="fixed w-full h-full top-0 left-0 bg-black bg-opacity-50 z-10 md:hidden"></div>
        )}

        <div className="p-8 mx-5">
          {/* Dashboard Header */}
          <div className="flex justify-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Doctor Dashboard
            </h1>
          </div>

          {/* Appointments Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {loading ? (
              <p className="text-center py-6 text-gray-500">
                Loading appointments...
              </p>
            ) : (
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="px-6 py-3 font-semibold">Patient Name</th>
                    <th className="px-6 py-3 font-semibold">
                      Appointment Date
                    </th>
                    <th className="px-6 py-3 font-semibold">
                      Appointment Time
                    </th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appointment, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-100 border-b border-gray-200 transition-all"
                      >
                        <td className="px-6 py-4 text-gray-700">
                          {appointment.user.firstName}{" "}
                          {appointment.user.lastName}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {appointment.appointmentDate}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {appointment.timeSlot}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {appointment.status}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          <button className=" bg-green-500 text-white rounded-md p-2 mx-1 hover:bg-green-400 hover:underline hover:underline-offset-2">
                            Approve
                          </button>
                          <button
                            className=" bg-red-500 text-white rounded-md p-2 mx-1 hover:bg-red-400 hover:underline hover:underline-offset-2"
                            onClick={() =>
                              handleAppointmentCancel(appointment.id)
                            }
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-6 text-gray-500"
                      >
                        No appointments available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
