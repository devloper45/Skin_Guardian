import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBarrr from "../SideBarrr";
import bg from "../../assets/bgtemplate.png";
import toast from "react-hot-toast";
import CopyToClipboard from "../../utils/CopyToClipboard";
import DownloadAsPdf from "../../utils/DownloadAsPdf";

export default function PReportTemplate() {
  const [openBar, setOpenBar] = useState(false);
  const [data, setdata] = useState("");
  const [ShowTextarea, setShowTextarea] = useState(false);

  const [formData, setFormData] = useState({
    template_no: null,
    report_date: "",
    client_name: "",
    revenue: "",
    cogs: "",
    operating_expenses: "",
    operating_cash_flow: "",
    investing_cash_flow: "",
    financing_cash_flow: "",
    current_ratio: "",
    debt_to_equity_ratio: "",
    roe: "",
    organization_name: "",
  });
  const id = useParams();
  console.log(id);
  useEffect(() => {
    if (id) {
      setFormData((prevdata) => ({ ...prevdata, template_no: id.id }));
    }
  }, []);

  const inputs = [
    { name: "report_date", label: "Report Date" },
    { name: "client_name", label: "Client Name" },
    { name: "revenue", label: "Revenue" },
    { name: "cogs", label: "Cost of Goods Sold" },
    { name: "operating_expenses", label: "Operating Expenses" },
    { name: "operating_cash_flow", label: "Operating Cash Flow" },
    { name: "investing_cash_flow", label: "Investing Cash Flow" },
    { name: "financing_cash_flow", label: "Financing Cash Flow" },
    { name: "current_ratio", label: "Current Ratio" },
    { name: "debt_to_equity_ratio", label: "Debt to Equity Ratio" },
    { name: "roe", label: "Return on Equity" },
    { name: "organization_name", label: "Organization Name" },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleGenerateReport(e) {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/generate-financial-report/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      setShowTextarea(true);

      if (!response.ok) {
        throw new Error("Failed to fetch report");
      }

      const dataa = await response.json();
      console.log(dataa);
      setdata(dataa.report);
    } catch (error) {
      console.error("Error:", error);
      alert("An error while analyzing.");
    }
  }

  return (
    <div className=" flex">
      <div className="flex h-screen overflow-hidden w-full ">
        <SideBarrr openBar={openBar} setOpenBar={setOpenBar} />
        <div
          className={`flex-1 overflow-auto w-full transition-all duration-300 ${
            openBar ? "ml-48" : "ml-10"
          }`}
        >
          {openBar && (
            <div className="w-[100vw]  fixed h-full  top-0 bg-black bg-opacity-75 md:hidden "></div>
          )}
          <div className="flex text-White my-10 flex-col items-center m-3 text-center">
            <h1 className="bold text-4xl my-5 m-3">Custom Report Template </h1>
            <p className="mb-10">
              You Can Generate Your Own Report By Simply Adding Your Content
            </p>
          </div>
          {/* shadow class  */}
          <div className="shadowb absolute top-7 left-0 h-72 w-[800px] "></div>

          <div className="flex justify-center">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-3/4 text-white m-5">
              {inputs.map((input) => (
                <div key={input.name} className="m-4 ">
                  <label
                    htmlFor={input.name}
                    className="block md:mx-4 text-white mb-2 text-sm font-medium "
                  >
                    {input.label}
                  </label>
                  <input
                    type="text"
                    id={input.name}
                    name={input.name}
                    value={formData[input.name]}
                    placeholder="Add text"
                    onChange={handleInputChange}
                    // InputColor from tailwingconfig
                    className={`text-white md:mx-4 bg-InputColor  placeholder:text-white placeholder:font-thin p-2 ${
                      openBar ? "px-2" : "px-4"
                    }  rounded text-sm sm:text-base `}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleGenerateReport}
              className="text-white mx-12 m-5 bg-InputColor hover:bg-[#5aa06f] hover:border-white hover:border p-2 px-8 rounded text-sm sm:text-base"
            >
              Generate Report
            </button>
          </div>

          {ShowTextarea && (
            <div className="flex flex-col items-center justify-center ml-5 mb-4">
              <textarea
                className={`border border-[#A1A1A1] bg-inherit text-white bg-[#4E4E4E] outline-none w-3/4 mx-5  shadow-lg rounded-lg p-3 `}
                // [#0D2A6D] shadow-lg rounded-3xl p-3 ${loading ? 'loading-text' : ''}`}
                name="textarea"
                id=""
                cols="28"
                rows="10"
                value={data} // Conditionally render loader or summary
                readOnly
              ></textarea>
              <div
                className="absolute bottom-16 right-0 shadowb  h-64 border w-[500px] "
                // style={{ divStyle }}
              ></div>
              <div className=" flex justify-end w-3/4 ">
                <div className=" flex -mt-7 mr-2 z-10 ">
                  <CopyToClipboard msgtext={data} />

                  <DownloadAsPdf msgtext={data} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
