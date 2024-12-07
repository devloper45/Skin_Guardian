// Active and Recent Appointments

import { useEffect, useState } from "react";
import Navbarr from "../Navbarr";
import Api from "../ProtectRoute/Api";
import toast, { LoaderIcon } from "react-hot-toast";

export default function AHAppointments() {
  const [activeAppointments, setActiveAppointments] = useState([]);

  const [loading, setLoading] = useState(false);

  async function handleActiveAppointments() {
    try {
      setLoading(true);
      const response = await Api.get(`/appointment`);
      console.log(response.data.data);
      setActiveAppointments(response.data.data); // Assuming data is an array of active appointments
    } catch (error) {
      console.error("Error fetching active appointments:", error);
    }

    setLoading(false);
  }

  // async function handleRecentAppointments() {
  //   try {
  //     const response = await Api.get(`/appointment/recent`);
  //     setRecentAppointments(response.data); // Assuming data is an array of recent appointments
  //   } catch (error) {
  //     console.error("Error fetching recent appointments:", error);
  //   }
  // }

  useEffect(() => {
    handleActiveAppointments();
    // handleRecentAppointments();
  }, []);
  async function handleAppointmentStatus(appointmentId) {
    try {
      await Api.delete(`/appointment/${appointmentId}`);
      // console.log(res.data, "aer");

      console.log(`Appointment ${appointmentId} status updated`);

      handleActiveAppointments();
      // handleRecentAppointments();
    } catch (error) {
      toast("Error occured while changing the status", { type: "error" });

      console.error(
        `Error updating appointment ${appointmentId} status:`,
        error
      );
    }
  }
  return (
    <div>
      <Navbarr />
      <div>
        <header className="bg-blue-100 py-10">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-primary">
              Appointments Dashboard
            </h1>
            <p className="text-lg text-muted-foreground mt-4">
              Manage your appointments.
            </p>
          </div>
        </header>

        <section className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Active Appointments</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Doctor Name</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {activeAppointments.length > 0 ? (
                  activeAppointments.map((appointment, index) => (
                    <tr key={index} className="text-center">
                      <td className="px-4 py-2">
                        {"Dr. " +
                          appointment.doctor.firstName +
                          " " +
                          appointment.doctor.lastName}
                      </td>
                      <td className="px-4 py-2">
                        {appointment.appointmentDate}
                      </td>
                      <td className="px-4 py-2">{appointment.timeSlot}</td>
                      <td className="px-4 py-2 text-green-500">
                        <div>{appointment.status}</div>

                        <div></div>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() =>
                            handleAppointmentStatus(appointment.id)
                          }
                          className=" bg-red-500 text-white rounded-md p-2 mx-1 hover:bg-red-400 hover:underline hover:underline-offset-2"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="flex w-full justify-center">
                      {loading ? (
                        <div className="my-4">
                          <LoaderIcon className="h-6 w-6" />
                        </div>
                      ) : (
                        // "...Loading"
                        <p className="px-4 py-2 text-center text-red-500">
                          No active appointments.
                        </p>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
