import React from "react";
export default function Appointement() {
  return (
    <div
      className=" bg-black/70 z-20 flex justify-center items-center top-0 left-0
   absolute w-full h-full"
    >
      <div className="flex flex-col bg-white rounded-lg h-auto w-9/12 relative p-6">
        <div className=" mx-auto p-6 bg-card rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <img
              src="https://placehold.co/100x100"
              alt="Doctor Profile"
              className="rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">Dr. Sippy Iqbal</h2>
              <p className="text-muted-foreground">
                oladoc Care Video Consultation (Online)
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
                Oct. 02
              </button>
              <button className="px-4 py-2 border rounded hover:bg-primary hover:text-primary-foreground">
                Oct. 03
              </button>
              <button className="px-4 py-2 border rounded hover:bg-primary hover:text-primary-foreground">
                Oct. 04
              </button>
              <button className="px-4 py-2 border rounded hover:bg-primary hover:text-primary-foreground">
                Oct. 05
              </button>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Afternoon Slots</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
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
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Evening Slots</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
              <button className="py-2 border rounded">05:15 PM</button>
              <button className="py-2 border rounded">05:35 PM</button>
              <button className="py-2 border rounded">05:55 PM</button>
              <button className="py-2 border rounded">06:15 PM</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
