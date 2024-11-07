import React, { useEffect } from "react";
import Api from "../ProtectRoute/Api";

export default function DocterDashboard() {
  async function handleDocterAppointment() {
    try {
      const response = await Api.get("/personal/doctor/appointments");
      if (response.status >= 200 && response.status < 300) {
        console.log("Appointments fetched successfully!", response.data);
        setDoctors(response.data.data);
      } else {
        console.log("Failed to fetch Appointment list");
      }
    } catch (error) {
      console.log("Error fetching Appointments:", error);
    }
  }

  useEffect(() => {
    handleDocterAppointment();
  }, []);

  return <div className=" flex">DocterDashboard</div>;
}
