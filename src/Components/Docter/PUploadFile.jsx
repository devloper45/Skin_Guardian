import React, { useState, useRef } from "react";
import Chat from "../Chat";
import documentIcon from "../../assets/document.png";
import { useParams } from "react-router-dom";
import SideBarrr from "../SideBarrr";
import Shadow from "../../assets/shadow.png";
import CopyToClipboard from "../../utils/CopyToClipboard";
import DownloadAsPdf from "../../utils/DownloadAsPdf";
import toast from "react-hot-toast";
import ChatRobo from "../../assets/roboimg.png";

import Tooltip from "../../utils/tooltip";

const PUploadFile = () => {
  const [files, setFiles] = useState([]);
  const [ModifiedFileName, setModifiedFileName] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSummaryIndex, setActiveSummaryIndex] = useState(null);
  const [chat, setChat] = useState(false);
  const [openBar, setOpenBar] = useState(false);
  const [chatButton, setChatButton] = useState(false);
  const fileInputRef = useRef(null);
  const id = useParams();
  console.log(id);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "application/docs",
      "text/plain",
    ];

    const invalidFiles = selectedFiles.filter(
      (file) => !allowedTypes.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      alert("Only PDF, DOCX, DOC, and TXT files are allowed.");
      return;
    }

    // Add selected files to state
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    // Modify file names and update state
    const modifiedFileNames = selectedFiles.map((file) => {
      let newFileName = file.name.replace(/[_.,]/g, "-");
      newFileName = newFileName.toLowerCase();
      return newFileName;
    });

    setModifiedFileName((prevFileNames) => [
      ...prevFileNames,
      ...modifiedFileNames,
    ]);
    console.log(selectedFiles);

    // Notify user of successful upload
    toast.success("File uploaded successfully.");
    localStorage.setItem("document_name", modifiedFileNames.join(", "));
  };

  async function handleSubmit() {
    console.log(files);
    console.log(ModifiedFileName);
    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    formData.append("user_id", userId);

    files.forEach((filename) => {
      console.log(filename.name);
      formData.append("document_names", filename.name);
    });

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/query-multi-document/",
        {
          method: "POST",
          body: formData,
        }
      );
      setChatButton(true);

      if (!response.ok) {
        console.log("error in embedding queryselector");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while uploading the file.");
    }
  }

  const handleDeleteFile = (indexToDelete) => {
    setFiles((prevFiles) => {
      const newFiles = prevFiles.filter((_, index) => index !== indexToDelete);
      return newFiles;
    });

    setSummaries((prevSummaries) => {
      const newSummaries = prevSummaries.filter(
        (_, index) => index !== indexToDelete
      );
      return newSummaries;
    });

    setActiveSummaryIndex((prevIndex) =>
      prevIndex === indexToDelete
        ? null
        : prevIndex > indexToDelete
        ? prevIndex - 1
        : prevIndex
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAnalyze = async () => {
    if (files.length === 0) {
      alert("Please upload files first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    const userId = localStorage.getItem("userId");
    formData.append("user_id", userId);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/multi-document-summary/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch summaries");
      }

      const data = await response.json();
      setSummaries(data.summaries);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while analyzing the files.");
    } finally {
      setLoading(false);
    }
  };

  const handleSummaryButtonClick = (index) => {
    setActiveSummaryIndex(index);
  };

  const chatBotHandler = () => {
    setChat((prevChat) => !prevChat);
  };

  const handleButtonClick = () => {
    handleSubmit();
    handleAnalyze();
  };

  return (
    <div className="text-white">
      <div className="flex h-screen overflow-hidden w-full">
        <SideBarrr openBar={openBar} setOpenBar={setOpenBar} />
        <div
          className={`flex-1 overflow-auto w-full transition-all duration-300 ${
            openBar ? "ml-48" : "ml-10"
          }`}
        >
          <div className=" relative z-10 min-h-screen flex flex-col w-full justify-center">
            <div className="p-4 py-6 justify-center">
              <div
                className="h-[70vh] w-2/3 absolute -z-10  hello "
                style={{
                  backgroundImage: `url(${Shadow})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="flex flex-col items-center m-3 text-center">
                {id.id == 1 && (
                  <h1 className="bold text-4xl m-3">
                    Your Financial Assistant{" "}
                  </h1>
                )}
                {id.id == 2 && (
                  <h1 className="bold text-4xl m-3">
                    Your Insurance Assistant{" "}
                  </h1>
                )}
                {id.id == 3 && (
                  <h1 className="bold text-4xl m-3">Your Generic Assistant </h1>
                )}
                <p className="text-xl">Upload your Document</p>
                <p className="mb-10">
                  Get your financial summary and get help from your own Personal
                  AI Assistant
                </p>
              </div>
              <div className="flex justify-center mb-4 sm:mb-0 shadow-custom-shadow">
                <div
                  className="flex bg-inherit shadow-lg w-3/4 border-dashed border-2 border-white items-center p-10 flex-col px-20 justify-center h-52 sm:h-auto text-gray-700 rounded"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <form action="" encType="multipart/form-data" method="post">
                    <input
                      className="hidden"
                      type="file"
                      accept=".pdf,.docx,.doc,.txt"
                      name="file"
                      id="imageupload"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      multiple
                    />
                  </form>
                  <p className="py-2 text-white sm:text-3xl text-base my-2 font-semibold px-4">
                    Drop your files here!
                  </p>
                  {files.length > 0 && (
                    <div className="mt-2 flex ">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <p className="text-sm text-white pt-4">{file.name}</p>
                          <img
                            src={documentIcon}
                            alt="Preview"
                            className="mt-2 text-white rounded-lg h-[40px] w-[40px]"
                          />

                          <svg
                            onClick={() => handleDeleteFile(index)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="fffff"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-6  mr-2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      ))}
                    </div>
                  )}
                  <label
                    htmlFor="imageupload"
                    className="text-white mx-12 relative mt-12 px-7 sm:text-lg mb-[-59px] bg-[#75A48C] hover:bg-[#71a389] p-2 justify-center text-sm sm:text-base"
                  >
                    Upload File
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleButtonClick}
                className="text-white mx-12 m-5 bg-[#75A48C] hover:bg-[#71a389] p-2 px-4 rounded-full text-sm sm:text-base"
              >
                Submit & Analyze
              </button>
            </div>

            {summaries.length > 0 && (
              <div className="m-2 flex flex-col items-center">
                <div className="flex flex-wrap justify-center mb-4">
                  {files.map((file, index) => (
                    <button
                      key={index}
                      onClick={() => handleSummaryButtonClick(index)}
                      className={`text-white mx-2 p-2 rounded-full bg-InputColor text-sm sm:text-base ${
                        activeSummaryIndex === index
                          ? "border border-white"
                          : ""
                      }`}
                    >
                      {file == null ? "" : file.name}
                    </button>
                  ))}
                </div>
                {activeSummaryIndex !== null && (
                  <div className="mb-4 relative z-10 w-3/4">
                    <h1 className="text-xl font-bold mb-2">
                      Summary for {files[activeSummaryIndex].name}:
                    </h1>
                    <textarea
                      className="border-InputColor border outline-none w-full bg-inherit shadow-lg rounded-3xl p-3"
                      name={`textarea-${activeSummaryIndex}`}
                      cols="28"
                      rows="10"
                      value={summaries[activeSummaryIndex].summary}
                      readOnly
                    ></textarea>
                    <div className=" flex justify-end ">
                      <div className=" flex">
                        <CopyToClipboard
                          msgtext={summaries[activeSummaryIndex].summary}
                        />

                        <DownloadAsPdf
                          filename={files[activeSummaryIndex].name}
                          msgtext={summaries[activeSummaryIndex].summary}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="h-[70vh] w-2/3 absolute -bottom-10 -z-10 -right-5 hello "
                  style={{
                    backgroundImage: `url(${Shadow})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
            )}
            {loading && (
              <div className="flex justify-center items-center">
                <div className="loading-dots flex">
                  <p className="text-white">
                    Loading<span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </p>
                </div>
              </div>
            )}
          </div>
          {chatButton && (
            <div className="absolute bottom-4 right-4 chatbot z-20">
              <Tooltip text="Want to Chat! Your AI Assistant is here">
                {chat && (
                  <Chat
                    onClose={chatBotHandler}
                    ModifiedFileName={files.map((file) => file.name)}
                  />
                )}
                {/* <button
                onClick={chatBotHandler}
                className="fixed bottom-4 right-4 z-20 bg-[#75A48C] hover:bg-[#71a389] text-white font-bold py-2 px-4 rounded-full shadow-lg"
              >
                Want to Chat! Your AI Assistant is here
              </button> */}
                <img
                  src={ChatRobo}
                  onClick={chatBotHandler}
                  className="fixed bottom-4 right-4 filter  drop-shadow-[0_20px_20px_rgba(51,66,59,1)] cursor-pointer w-28 transition ease-in-out duration-300 h-28 text-white hover:translate-y-1 hover:scale-110 "
                  alt=""
                  srcset=""
                />
              </Tooltip>
              <span class="fixed   right-5 h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="fixed inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PUploadFile;

// import React, { useState, useRef } from "react";
// import Chat from "../Chat";
// import documentIcon from "../../assets/document.png";
// import { useParams } from "react-router-dom";
// import SideBarrr from "../SideBarrr";
// import Shadow from "../../assets/shadow.png";
// import CopyToClipboard from "../../utils/CopyToClipboard";
// import DownloadAsPdf from "../../utils/DownloadAsPdf";

// const PUploadFile = () => {
//   const [files, setFiles] = useState([]);
//   const [ModifiedFileName, setModifiedFileName] = useState([]);
//   const [summaries, setSummaries] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [activeSummaryIndex, setActiveSummaryIndex] = useState(null);
//   const [chat, setChat] = useState(false);
//   const [openBar, setOpenBar] = useState(false);
//   const [chatButton, setChatButton] = useState(false);
//   const fileInputRef = useRef(null);
//   const id = useParams();
//   console.log(id);

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);

//     const allowedTypes = [
//       "application/pdf",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "application/msword",
//       "application/docs",
//       "text/plain",
//     ];

//     const invalidFiles = selectedFiles.filter(
//       (file) => !allowedTypes.includes(file.type)
//     );
//     if (invalidFiles.length > 0) {
//       alert("Only PDF, DOCX, DOC, and TXT files are allowed.");
//       return;
//     }

//     // Add selected files to state
//     setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

//     // Modify file names and update state
//     const modifiedFileNames = selectedFiles.map((file) => {
//       let newFileName = file.name.replace(/[_.,]/g, "-");
//       newFileName = newFileName.toLowerCase();
//       return newFileName;
//     });

//     setModifiedFileName((prevFileNames) => [
//       ...prevFileNames,
//       ...modifiedFileNames,
//     ]);
//     console.log(selectedFiles);

//     // Notify user of successful upload
//     toast.success("File uploaded successfully.");
//     localStorage.setItem("document_name", modifiedFileNames.join(", "));
//   };
//   async function handleSubmit() {
//     console.log(files);

//     console.log(ModifiedFileName);
//     const userId = localStorage.getItem("userId");
//     const formData = new FormData();
//     files.forEach((file, index) => {
//       formData.append(`files[${index}]`, file);
//     });
//     formData.append("user_id", userId);

//     // ModifiedFileName.forEach((filename) => {
//     //   formData.append("document_names", filename);
//     // });
//     files.forEach((filename) => {
//       console.log(filename.name);
//       formData.append("document_names", filename.name);
//     });

//     try {
//       // const response = await fetch('https://financialbots.pythonanywhere.com/query-document/', {
//       const response = await fetch(
//         "http://127.0.0.1:8000/query-multi-document/",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );
//       setChatButton(true);

//       if (!response.ok) {
//         console.log("error in embedding queryselector");
//         // throw new Error('Failed to upload file');
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("An error occurred while uploading the file.");
//     }
//   }

//   const handleDeleteFile = (indexToDelete) => {
//     setFiles((prevFiles) =>
//       prevFiles.filter((_, index) => index !== indexToDelete)
//     );
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       handleFileChange({ target: { files: e.dataTransfer.files } });
//       e.dataTransfer.clearData();
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleAnalyze = async () => {
//     if (files.length === 0) {
//       alert("Please upload files first.");
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     files.forEach((file) => formData.append("files", file));
//     const userId = localStorage.getItem("userId");
//     formData.append("user_id", userId);

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:8000/multi-document-summary/",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch summaries");
//       }

//       const data = await response.json();
//       setSummaries(data.summaries);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while analyzing the files.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSummaryButtonClick = (index) => {
//     setActiveSummaryIndex(index);
//   };

//   const chatBotHandler = () => {
//     setChat((prevChat) => !prevChat);
//   };
//   const handleButtonClick = () => {
//     handleSubmit();
//     handleAnalyze();
//   };
//   let fileNName=[]

//   return (
//     <div className="text-white">
//       <div className="flex h-screen overflow-hidden w-full">
//         <SideBarrr openBar={openBar} setOpenBar={setOpenBar} />
//         <div
//           className={`flex-1 overflow-auto w-full transition-all duration-300 ${
//             openBar ? "ml-48" : "ml-10"
//           }`}
//         >
//           {/* <div className="relative z-10"> */}
//           <div className=" relative z-10 min-h-screen flex flex-col w-full justify-center">
//             <div className="p-4 py-6 justify-center">
//               <div
//                 className="h-[70vh] w-2/3 absolute -z-10  hello "
//                 style={{
//                   backgroundImage: `url(${Shadow})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                 }}
//               ></div>
//               <div className="flex flex-col items-center m-3 text-center">
//                 {id.id == 1 && (
//                   <h1 className="bold text-4xl m-3">
//                     Your Financial Assistant{" "}
//                   </h1>
//                 )}
//                 {id.id == 2 && (
//                   <h1 className="bold text-4xl m-3">
//                     Your Insurance Assistant{" "}
//                   </h1>
//                 )}
//                 {id.id == 3 && (
//                   <h1 className="bold text-4xl m-3">Your Generic Assistant </h1>
//                 )}
//                 <p className="text-xl">Upload your Document</p>
//                 <p className="mb-10">
//                   Get your financial summary and get help from your own Personal
//                   AI Assistant
//                 </p>
//               </div>
//               <div className="flex justify-center mb-4 sm:mb-0 shadow-custom-shadow">
//                 <div
//                   className="flex bg-inherit shadow-lg w-3/4 border-dashed border-2 border-white items-center p-10 flex-col px-20 justify-center h-52 sm:h-auto text-gray-700 rounded"
//                   onDrop={handleDrop}
//                   onDragOver={handleDragOver}
//                 >
//                   <form action="" encType="multipart/form-data" method="post">
//                     <input
//                       className="hidden"
//                       type="file"
//                       accept=".pdf,.docx,.doc,.txt"
//                       name="file"
//                       id="imageupload"
//                       ref={fileInputRef}
//                       onChange={handleFileChange}
//                       multiple
//                     />
//                   </form>
//                   <p className="py-2 text-white sm:text-3xl text-base my-2 font-semibold px-4">
//                     Drop your files here!
//                   </p>
//                   {files.length > 0 && (
//                     <div className="mt-2 flex ">
//                       {files.map((file, index) => (
//                         <div key={index} className="flex items-center mb-2">
//                           <p className="text-sm text-white pt-4">{file.name}</p>
//                           <img
//                             src={documentIcon}
//                             alt="Preview"
//                             className="mt-2 text-white rounded-lg h-[40px] w-[40px]"
//                           />

//                           <svg
//                             onClick={() => handleDeleteFile(index)}
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="fffff"
//                             viewBox="0 0 24 24"
//                             stroke-width="1.5"
//                             stroke="currentColor"
//                             className="size-6  mr-2"
//                           >
//                             <path
//                               stroke-linecap="round"
//                               stroke-linejoin="round"
//                               d="M6 18 18 6M6 6l12 12"
//                             />
//                           </svg>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                   <label
//                     htmlFor="imageupload"
//                     className="text-white mx-12 relative mt-12 px-7 sm:text-lg mb-[-59px] bg-[#75A48C] hover:bg-[#71a389] p-2 justify-center text-sm sm:text-base"
//                   >
//                     Upload File
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-center">
//               <button
//                 onClick={handleButtonClick}
//                 className="text-white mx-12 m-5 bg-[#75A48C] hover:bg-[#71a389] p-2 px-4 rounded-full text-sm sm:text-base"
//               >
//                 Submit & Analyze
//               </button>
//             </div>

//             {summaries.length > 0 && (
//               <div className="m-2 flex flex-col items-center">
//                 <div className="flex flex-wrap justify-center mb-4">
//                   {files.map((file, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleSummaryButtonClick(index)}
//                       className={`text-white mx-2 p-2 rounded-full bg-InputColor text-sm sm:text-base ${
//                         activeSummaryIndex === index
//                           ? "border border-white"
//                           : ""
//                       }`}
//                     >
//                       {file.name}
//                     </button>
//                   ))}
//                 </div>
//                 {activeSummaryIndex !== null && (
//                   <div className="mb-4 relative z-10 w-3/4">
//                     <h1 className="text-xl font-bold mb-2">
//                       Summary for {files[activeSummaryIndex].name}:
//                     </h1>
//                     <textarea
//                       className="border-InputColor border outline-none w-full bg-inherit shadow-lg rounded-3xl p-3"
//                       name={`textarea-${activeSummaryIndex}`}
//                       cols="28"
//                       rows="10"
//                       value={summaries[activeSummaryIndex].summary}
//                       readOnly
//                     ></textarea>
//                     <div className=" flex justify-end ">
//                       <div className=" flex">
//                         <CopyToClipboard
//                           msgtext={summaries[activeSummaryIndex].summary}
//                         />

//                         <DownloadAsPdf
//                           filename={files[activeSummaryIndex].name}
//                           msgtext={summaries[activeSummaryIndex].summary}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div
//                   className="h-[70vh] w-2/3 absolute -bottom-10 -z-10 -right-5 hello "
//                   style={{
//                     backgroundImage: `url(${Shadow})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                   }}
//                 ></div>
//               </div>
//             )}
//             {loading && (
//               <div className="flex justify-center items-center">
//                 <div className="loading-dots flex">
//                   <p className="text-white">
//                     Loading<span>.</span>
//                     <span>.</span>
//                     <span>.</span>
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//           {/* </div> */}
//           {chatButton && (
//             <div className="absolute bottom-4 right-4 chatbot">
//               {chat && (
//                 <Chat
//                   onClose={chatBotHandler}
//                   ModifiedFileName={files.map((file) => file.name)}
//                 />
//               )}
//               <button
//                 onClick={chatBotHandler}
//                 className="fixed bottom-4 right-4 z-20 bg-[#75A48C] hover:bg-[#71a389] text-white font-bold py-2 px-4 rounded-full shadow-lg"
//               >
//                 Want to Chat! Your AI Assistant is here
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PUploadFile;
