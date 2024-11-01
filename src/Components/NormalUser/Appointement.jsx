import React, { useEffect, useRef } from "react";
import { useCloseRef } from "../../hooks/useCloseRef";
import toast from "react-hot-toast";
import Api from "../ProtectRoute/Api";
export default function Appointement({ setOpenAppointementModel, docterName,docterID }) {
  const AppointementModeRef = useRef(null);
  useCloseRef(AppointementModeRef, setOpenAppointementModel);
  console.log(docterName + "hrhehe");

 function  handleApointment(){
  toast.success("Appointment booked successfully")
  setOpenAppointementModel(false)
 }

 useEffect(()=>{
  async function handleDocterDetail() {
    const response = await Api.get(`/docter/${docterID}`)
    
  }
  handleDocterDetail()
 },[])

  return (
    <div
      className=" bg-black/70 z-20 flex justify-center items-center top-0 left-0
   absolute w-full h-full"
    >
      <div
        ref={AppointementModeRef}
        className="flex flex-col bg-white rounded-lg h-auto w-9/12 relative p-6"
      >
        <div className=" mx-auto p-6 bg-card rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <img
              src="https://placehold.co/100x100"
              alt="Doctor Profile"
              className="rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">Dr. {docterName}</h2>
              <p className="text-muted-foreground">
                Skin Guardian Video Consultation (Online)
              </p>
              <p className="text-primary">Fee: Rs. 1,500</p>
            </div>
          </div>
          <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 py-2 px-4 rounded">
            Pay Online & Get 10% OFF
          </button>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Select Date</h3>
            <div className="flex space-x-2 mt-2">
              <button className="px-4 py-2 border rounded hover:bg-primary hover:text-primary-foreground">
                Nov. 01
              </button>
              <button className="px-4 py-2 border rounded hover:bg-primary hover:text-primary-foreground">
                Nov. 02
              </button>
              <button className="px-4 py-2 border rounded hover:bg-primary hover:text-primary-foreground">
                Nov. 03
              </button>
              <button className="px-4 py-2 border rounded hover:bg-primary hover:text-primary-foreground">
                Nov. 04
              </button>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Available Slots</h3>
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2"
              onClick={handleApointment}
            >
              <button className="bg-orange-200 text-black py-2 rounded">
                01:15 PM
              </button>
              <button className="py-2 border rounded">01:35 PM</button>
              <button className="py-2 border rounded">01:55 PM</button>
              <button className="py-2 border rounded">02:15 PM</button>
              <button className="py-2 border rounded">02:35 PM</button>
              <button className="py-2 border rounded">03:15 PM</button>
              <button className="py-2 border rounded">03:35 PM</button>
              <button className="py-2 border rounded">03:55 PM</button>
              <button className="py-2 border rounded">04:15 PM</button>
              <button className="py-2 border rounded">04:35 PM</button>
              <button className="py-2 border rounded">04:55 PM</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
