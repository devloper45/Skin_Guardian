import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import Api from "../ProtectRoute/Api";

export default function UploadOrTakeImage({ handleUploadPic }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const imageObject = new Image();
      imageObject.onload = function () {
        const width = imageObject.width;
        const height = imageObject.height;
        const megapixels = (width * height) / 1000000;

        if (megapixels >= 12) {
          setImage(imageSrc);
          picToBackend(imageSrc);
        } else {
          setErrorMessage("Image must be at least 12 megapixels.");
          setImage(null);
        }
      };
      imageObject.src = imageSrc;
    }
  }, [webcamRef]);

  function handleTakePhoto() {
    setIsTakingPhoto(true);
  }

  function handleUpload() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = handleFileSelection;
    fileInput.click();
  }

  async function handleFileSelection(event) {
    const file = event.target.files[0];
    if (!file) return;

    const imageObject = new Image();
    imageObject.onload = function () {
      const width = imageObject.width;
      const height = imageObject.height;
      const megapixels = (width * height) / 1000000;

      if (megapixels >= 12) {
        setImage(URL.createObjectURL(file));
        picToBackend(file);
      } else {
        setErrorMessage("Image must be at least 12 megapixels.");
        setImage(null);
      }
    };
    imageObject.src = URL.createObjectURL(file);
  }

  async function picToBackend(imageFile) {
    try {
   
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await Api.post("/user/image", formData);

      if (response.ok) {
        setErrorMessage("");
        alert("Image uploaded successfully!");
      } else {
        setErrorMessage("Failed to upload image.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while uploading.");
    }
  }
  function handleInnerClose() {
    console.log("handle it now ");
    setImage(null);
    setIsTakingPhoto(false);
  }

  return (
    <div className="flex justify-center items-center ">
      <div className="flex h-auto w-[500px] bg-[#f5f6f7] border rounded-3xl relative p-6">
        <div
          className="absolute top-2 right-2 hover:cursor-pointer"
          onClick={handleUploadPic}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="  relative flex flex-col justify-center items-center w-full">
          {isTakingPhoto ? (
            <>
              <div className=" flex justify-end w-full  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 hover:cursor-pointer"
                  onClick={handleInnerClose}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
              <button className="btn mt-4" onClick={capture}>
                Capture
              </button>
            </>
          ) : (
            <>
              <button className="btn mb-4" onClick={handleTakePhoto}>
                Take Image
              </button>
              <button className="btn mb-4" onClick={handleUpload}>
                Upload Image
              </button>
            </>
          )}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";

// export default function UploadOrTakeImage() {
//   const [errorMessage, setErrorMessage] = useState("");
//   const [image, setImage] = useState(null);

//   function handleTakePhoto() {
//     // Trigger the camera input
//     const fileInput = document.createElement("input");
//     fileInput.type = "file";
//     fileInput.accept = "image/*";
//     fileInput.capture = "environment"; // This uses the back camera
//     fileInput.onchange = handleFileSelection;
//     fileInput.click();
//   }

//   function handleUpload() {
//     // Trigger the file input for upload
//     const fileInput = document.createElement("input");
//     fileInput.type = "file";
//     fileInput.accept = "image/*";
//     fileInput.onchange = handleFileSelection;
//     fileInput.click();
//   }

//   async function handleFileSelection(event) {
//     const file = event.target.files[0];
//     if (!file) return;

//     // Validate image resolution
//     const imageObject = new Image();
//     imageObject.onload = function () {
//       const width = imageObject.width;
//       const height = imageObject.height;
//       const megapixels = (width * height) / 1000000;

//       if (megapixels >= 12) {
//         setImage(file);
//         picToBackend(file);
//       } else {
//         setErrorMessage("Image must be at least 12 megapixels.");
//         setImage(null);
//       }
//     };
//     imageObject.src = URL.createObjectURL(file);
//   }

//   async function picToBackend(imageFile) {
//     try {
//       const formData = new FormData();
//       formData.append("image", imageFile);

//       const response = await fetch("/api/upload-image", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         setErrorMessage("");
//         alert("Image uploaded successfully!");
//       } else {
//         setErrorMessage("Failed to upload image.");
//       }
//     } catch (error) {
//       setErrorMessage("An error occurred while uploading.");
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="flex h-[500px] w-[500px] border rounded-3xl relative p-6">
//         <div
//           className="absolute top-2 right-2 hover:cursor-pointer"
//           onClick={() => setImage(null)}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               fillRule="evenodd"
//               d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </div>
//         <div className="flex flex-col justify-center items-center w-full">
//           <button className="btn mb-4" onClick={handleTakePhoto}>
//             Take Image
//           </button>
//           <button className="btn mb-4" onClick={handleUpload}>
//             Upload Image
//           </button>
//           {errorMessage && (
//             <p className="text-red-500 mt-2">{errorMessage}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// --------------------------------------------

// import React from "react";

// export default function UploadOrTakeImage() {

//   function handleTakePhoto(){
//     picToBackend()

//   }
//   function handleUpload(){

//     picToBackend();
//   }
//   async function picToBackend(){
//     // Api call
//   }
//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className=" flex h-[500px] w-[500px] border rounded-3xl" >
//         <div className=" relative right-0  m-2 hover:cursor-pointer">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             class="size-6"
//           >
//             <path
//               fill-rule="evenodd"
//               d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
//               clip-rule="evenodd"
//             />
//           </svg>
//         </div>
//         <div className="flex flex-col justify-center items-center">
//           <button className="btn" onClick={handleTakePhoto}>Take Image</button>
//           <button className="btn" onClick={handleUpload}>Upload Image</button>
//           <input type="hidden" name="" />
//         </div>
//       </div>
//     </div>
//   );
// }
