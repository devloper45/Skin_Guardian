import React, { useEffect, useState } from "react";
import Navbarr from "../Navbarr";
import Api from "../ProtectRoute/Api";

export default function AHAppointments() {
  const [activeAppointments, setActiveAppointments] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);

  async function handleActiveAppointments() {
    try {
      const response = await Api.get(`/appointment/active`);
      setActiveAppointments(response.data); // Assuming data is an array of active appointments
    } catch (error) {
      console.error("Error fetching active appointments:", error);
    }
  }

  async function handleRecentAppointments() {
    try {
      const response = await Api.get(`/appointment/recent`);
      setRecentAppointments(response.data); // Assuming data is an array of recent appointments
    } catch (error) {
      console.error("Error fetching recent appointments:", error);
    }
  }

  useEffect(() => {
    handleActiveAppointments();
    handleRecentAppointments();
  }, []);

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
              Manage your active and recent appointments.
            </p>
          </div>
        </header>

        <section className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Active Appointments</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Doctor</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {activeAppointments.length > 0 ? (
                  activeAppointments.map((appointment, index) => (
                    <tr key={index} className="text-center">
                      <td className="px-4 py-2">{appointment.doctorName}</td>
                      <td className="px-4 py-2">{appointment.date}</td>
                      <td className="px-4 py-2">{appointment.time}</td>
                      <td className="px-4 py-2 text-green-500">
                        {appointment.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-2 text-center text-red-500"
                    >
                      No active appointments.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Appointments</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Doctor</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.length > 0 ? (
                  recentAppointments.map((appointment, index) => (
                    <tr key={index} className="text-center">
                      <td className="px-4 py-2">{appointment.doctorName}</td>
                      <td className="px-4 py-2">{appointment.date}</td>
                      <td className="px-4 py-2">{appointment.time}</td>
                      <td className="px-4 py-2 text-gray-500">
                        {appointment.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-2 text-center text-red-500"
                    >
                      No recent appointments.
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

// Active and Recent Appointments
// import React, { useEffect, useState } from "react";
// import Navbarr from "../Navbarr";
// import Api from "../ProtectRoute/Api";

// export default function AHAppointments() {

//    async function handleActiveAppointments(){
//     const response = await Api.get(`/appointment`)
//    }
//    async function handleRecentAppointments(){}

//    useEffect(()=>{
//     handleActiveAppointments(
//     );
//     handleRecentAppointments();
//    },[])
//   return (
//     <div>
//       <Navbarr />

//       <div>
//         {" "}
//         <header className="bg-blue-100 py-10">
//           <div className="container mx-auto text-center">
//             <h1 className="text-4xl font-extrabold text-primary">
//               Appointments Dashboard
//             </h1>
//             <p className="text-lg text-muted-foreground mt-4">
//               Manage your active and recent appointments.
//             </p>
//           </div>
//         </header>
//         <section>
//           <h1>Active Appointments</h1>
//           <div>
//             <table className="table-auto w-full">
//               <thead></thead>
//             </table>
//           </div>
//         </section>
//         <section>
//           <h1>Recent Appointments</h1>
//           <div>
//             <table className="table-auto w-full">
//               <thead></thead>
//             </table>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
