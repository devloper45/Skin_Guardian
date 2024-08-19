import React, { useState, useRef, useEffect } from "react";
import document from "../../assets/document.png";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import SideBarrr from "../SideBarrr";
import Api from "../ProtectRoute/Api";

const UploadOrTakeImage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ModifiedFileName, setModifiedFileName] = useState("");
  const [openBar, setOpenBar] = useState(false);
  const [imageSrc, setImageSrc] = useState(null); // For displaying captured image
  useEffect(() => {
    // Code that should only run in the browser
    if (typeof document !== "undefined") {
      // Example of browser-specific code, e.g., accessing the camera
      console.log("Running in the browser environment!");
    }
  }, []);

  const fileInputRef = useRef(null);
  const id = useParams();

  const handleFileChange = async (e) => {
    let selectedFile = e.target.files[0];
    if (!selectedFile) return toast.error("Failed to upload Image");

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Only JPEG, PNG, and GIF image files are allowed.");
      return;
    }

    const userId = localStorage.getItem("userId");

    setFile(selectedFile);
    let newModifiedFileName = selectedFile.name.replace(/[_.,]/g, "-");
    newModifiedFileName = newModifiedFileName.toLowerCase();
    setModifiedFileName(newModifiedFileName);

    toast.success("Image uploaded successfully.");
    localStorage.setItem("document_name", newModifiedFileName);
    setImageSrc(URL.createObjectURL(selectedFile)); // Display the uploaded image
  };

  const handleCameraImage = () => {
    if (typeof document !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 4000, height: 3000 } })
        .then((stream) => {
          const video = document.createElement("video");
          video.srcObject = stream;
          video.play();

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          video.onloadedmetadata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Draw video frame to canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            stream.getTracks().forEach((track) => track.stop()); // Stop the video stream

            // Check resolution (12 MP = 4000 x 3000)
            if (canvas.width * canvas.height < 12000000) {
              toast.error(
                "Captured image is less than 12 MP. Please try again."
              );
              return;
            }

            // Convert canvas to blob for image preview and upload
            canvas.toBlob((blob) => {
              const capturedImage = new File([blob], "captured-image.jpg", {
                type: "image/jpeg",
              });
              setFile(capturedImage);
              setImageSrc(URL.createObjectURL(capturedImage));
            }, "image/jpeg");
          };
        })
        .catch((error) => {
          console.error("Error accessing camera: ", error);
          toast.error("Failed to access the camera.");
        });
    }
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
    if (!file) {
      toast("Please upload or capture an image first.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await Api.post("/summarize-pdf/", formData);
      const data = response.data.summary;
      console.log("data is here " + data);
      setSummary(data);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while analyzing the file.");
    } finally {
      setLoading(false);
    }
  };

  const clearFileHandler = () => {
    setFile(null);
    setImageSrc(null); // Clear image preview
    setSummary("");
    localStorage.removeItem("document_name");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex min-h-screen text-black">
      <div className="flex overflow-hidden w-full">
        <SideBarrr openBar={openBar} setOpenBar={setOpenBar} />
        <div
          className={`flex-1 overflow-auto w-full transition-all duration-300 ${
            openBar ? "ml-48" : "ml-10"
          }`}
        >
          <div className="sm:mb-16 md:mb-10 lg:mb-1 p-4 text-White py-6 justify-center">
            <div className="flex flex-col items-center m-3 text-center">
              <h1 className="bold text-4xl m-3">Skin Guardian</h1>
              <p className="text-xl">Upload or Capture your Image</p>
              <p className="mb-10">
                Get your image analyzed and get help from your own Personal AI
                Assistant
              </p>
            </div>
            <div className="flex justify-center mb-4 sm:mb-0">
              <div
                className="flex bg-inherit shadow-lg w-3/4 border-dashed border-2 border-White items-center p-10 flex-col px-20 justify-center h-52 sm:h-auto text-gray-300 rounded"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  className="hidden"
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  name="file"
                  id="imageupload"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />

                <p className="py-2 text-White sm:text-3xl text-base my-2 font-semibold px-4">
                  Drop your image here!
                </p>
                {imageSrc && (
                  <div className="mt-2 flex imagggge">
                    <img
                      src={imageSrc}
                      alt="Preview"
                      className="mt-2 text-White rounded-lg h-[40px] w-[40px]"
                    />
                    <svg
                      onClick={clearFileHandler}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#ffffff"
                      className="bi bi-x text-lg cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                  </div>
                )}
                <div className="flex justify-center">
                  <label
                    htmlFor="imageupload"
                    className="text-White mx-12 relative mt-12 px-7 mb-[-59px] bg-[#75A48C] p-2 justify-center text-sm sm:text-base"
                  >
                    Upload Image
                  </label>
                  <button
                    onClick={handleCameraImage}
                    className="text-White mx-12 m-5 bg-[#75A48C] hover:bg-[#618673] p-2 px-4 rounded-full text-sm sm:text-base"
                  >
                    Take Image
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleCameraImage}
              className="text-White mx-12 m-5 bg-[#75A48C] hover:bg-[#618673] p-2 px-4 rounded-full text-sm sm:text-base"
            >
              Take Image
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              className="text-White mx-12 m-5 bg-[#75A48C] hover:bg-[#618673] p-2 px-4 rounded-full text-sm sm:text-base"
            >
              Analyze
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadOrTakeImage;

// import React, { useState, useRef } from "react";
// import document from "../../assets/document.png";
// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";
// import SideBarrr from "../SideBarrr";
// import Api from "../ProtectRoute/Api";

// const UploadOrTakeImage = () => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [ModifiedFileName, setModifiedFileName] = useState("");
//   const [openBar, setOpenBar] = useState(false);

//   const fileInputRef = useRef(null);
//   const id = useParams();
//   console.log(id);

//   const handleFileChange = async (e) => {
//     let selectedFile = e.target.files[0];
//     if (!selectedFile) return toast.error("Failed to upload Image");

//     const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

//     if (!allowedTypes.includes(selectedFile.type)) {
//       toast.error("Only JPEG, PNG, and GIF image files are allowed.");
//       return;
//     }

//     const userId = localStorage.getItem("userId");

//     setFile(selectedFile);
//     let newModifiedFileName = selectedFile.name.replace(/[_.,]/g, "-");
//     newModifiedFileName = newModifiedFileName.toLowerCase();
//     setModifiedFileName(newModifiedFileName);

//     toast.success("File uploaded successfully.");
//     localStorage.setItem("document_name", newModifiedFileName);
//     console.log(selectedFile);

//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     formData.append("user_id", userId);
//     formData.append("document_name", newModifiedFileName);

//     try {
//       const response = await Api.post("/query-document/", formData);

//       if (!response.ok) {
//         console.log("error in embedding queryselector");
//         }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("An error occurred while uploading the file.");
//     }
//   };
//   function handleCameraImage() {}

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
//     if (!file) {
//       toast("Please upload a file first.");
//       return;
//     }
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await Api.post("/summarize-pdf/", formData);
//       console.log("no response");
//       console.log(response.data.summary);
//       const data = response.data.summary;
//       console.log("data is here " + data);
//       setSummary(data);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while analyzing the file.");
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   const clearFileHandler = () => {
//     setFile(null);

//     setSummary("");
//     localStorage.removeItem("document_name");
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   return (
//     <div
//       className=" flex min-h-screen   text-black"

//     >
//       <div className="flex  overflow-hidden w-full">
//         <SideBarrr openBar={openBar} setOpenBar={setOpenBar} />
//         <div
//           className={`flex-1 overflow-auto w-full transition-all duration-300 ${
//             openBar ? "ml-48" : "ml-10"
//           }`}
//         >
//           <div className="sm:mb-16 md:mb-10 lg:mb-1   p-4 py-6 justify-center">
//             <div className="flex flex-col items-center m-3 text-center">
//               <h1 className="bold text-4xl m-3">Skin Guardian </h1>

//               <p className="text-xl">Upload your Document </p>
//               <p className="mb-10">
//                 Get your financial Summary and get help from your own Personal
//                 AI Assistant{" "}
//               </p>
//             </div>
//             <div className="flex justify-center  mb-4 sm:mb-0">
//               <div
//                 className="flex  bg-inherit shadow-lg w-3/4 border-dashed border-2 border-white items-center p-10 flex-col px-20 justify-center h-52 sm:h-auto  text-gray-300 rounded"
//                 onDrop={handleDrop}
//                 onDragOver={handleDragOver}
//               >
//                 <input
//                   className="hidden"
//                   type="file"
//                   accept=".jpg,.jpeg,.png,.gif"
//                   name="file"
//                   id="imageupload"
//                   ref={fileInputRef}
//                   onChange={handleFileChange}
//                 />

//                 <p className="py-2 text-white sm:text-3xl text-base my-2 font-semibold px-4">
//                   Drop your image here!
//                 </p>
//                 {file && (
//                   <div className="mt-2 flex">
//                     <p className="text-sm text-white pt-4">{file.name}</p>
//                     <img
//                       src={document}
//                       alt="Preview"
//                       className="mt-2 text-white rounded-lg h-[40px] w-[40px]"
//                     />
//                     <svg
//                       onClick={clearFileHandler}
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       fill="#ffffff"
//                       className="bi bi-x text-lg cursor-pointer"
//                       viewBox="0 0 16 16"
//                     >
//                       <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
//                     </svg>
//                   </div>
//                 )}
//                 <label
//                   htmlFor="imageupload"
//                   className="text-white mx-12 relative mt-12 px-7 mb-[-59px] bg-[#75A48C]  p-2 justify-center  text-sm sm:text-base"
//                 >
//                   Upload Image
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <button
//               onClick={handleCameraImage}
//               className="text-white mx-12 m-5 bg-[#75A48C] hover:bg-[#618673] p-2 px-4 rounded-full text-sm sm:text-base"
//             >
//               Take Image
//             </button>
//           </div>
//           <div className="flex justify-center">
//             <button
//               onClick={handleAnalyze}
//               className="text-white mx-12 m-5 bg-[#75A48C] hover:bg-[#618673] p-2 px-4 rounded-full text-sm sm:text-base"
//             >
//               Analyze
//             </button>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default UploadOrTakeImage;
