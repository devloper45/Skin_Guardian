import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam"; // Assuming you're using react-webcam for capturing photos
import document from "../../assets/document.png";
import Api from "../ProtectRoute/Api";
import { Button, Result, Progress } from "antd";
import { Link } from "react-router-dom";
import Navbarr from "../Navbarr";
export default function UploadImage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [fileIsUploading, setFileIsUploading] = useState(false);
  const [viewReport, setViewReport] = useState(false);

  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imageName, setImageName] = useState(null);
  const [AiResponse, setResponse] = useState("");
  const [file, setFile] = useState(null);

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

  async function handleFileSelection(event) {
    console.log("File selection event triggered");

    console.log("hhhhhh");
    const file = event.target.files[0];
    console.log(file);
    console.log(file.name);
    setImageName(file.name);
    if (!file) return;

    const imageObject = new Image();
    imageObject.onload = function () {
      const width = imageObject.width;
      const height = imageObject.height;
      const megapixels = (width * height) / 1000000;

      // if (megapixels >= 12) {
      setImage(URL.createObjectURL(file));

      picToBackend(file);
      // } else {
      //   setErrorMessage("Image must be at least 12 megapixels.");
      //   setImage(null);
      // }
    };
    imageObject.src = URL.createObjectURL(file);
  }

  async function picToBackend(imageFile) {
    try {
      setFileIsUploading(true);
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await Api.post("/user/image", formData);

      if (response.data.data.title) {
        setErrorMessage("");
        setFileIsUploading(false);
        setResponse(response.data.data);
        console.log("reponse after succeess", response.data);

        // alert("Image uploaded successfully!");
      } else {
        setFileIsUploading(false);
        setErrorMessage("Failed to upload image.");
        console.log("reponse", response.data);
      }
    } catch (error) {
      setFileIsUploading(false);
      setErrorMessage("An error occurred while uploading.");
    }
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelection({ target: { files } });
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const clearFileHandler = () => {
    setFile(null);
    setImage(null);
    setImageName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  function handleInnerClose() {
    setImage(null);
    setIsTakingPhoto(false);
  }

  return (
    <div className="relative">
      <Navbarr />
      {fileIsUploading && (
        <div className="w-[100vw] min-h-screen absolute z-20 flex justify-center items-center top-0 bg-black/70 ">
          <div className=" loader h-10 z-20 "></div>
        </div>
      )}
      <div className="sm:mb-16 md:mb-10 lg:mb-1 p-4 py-6 justify-center">
        {AiResponse?.title ? (
          <div className="absolute flex flex-col items-center  justify-center bg-white w-full h-full z-20">
            <Result
              status={
                AiResponse.title === "NON-INFECTED" ? "success" : "warning"
              }
              title={
                AiResponse.title === "NON-INFECTED"
                  ? "Successfully Analyzed the Image"
                  : ` Attention: Analysis indicates an issue. 
                  ${AiResponse.title}`
              }
              subTitle={
                AiResponse.title === "NON-INFECTED"
                  ? "Congratulations! No cancer found."
                  : ` Click View Button to see the analysis result `
              }
              extra={[
                //   <p key="info" className="text-gray-600">
                //   Early detection can save lives. Please consult a certified dermatologist
                //   for a detailed diagnosis and treatment plan.
                // </p>
                <Button type="primary" key="console">
                  <Link
                    to={
                      AiResponse.title === "NON-INFECTED"
                        ? `/SkinProducts`
                        : "/ConsultCancerDocter"
                    }
                  >
                    {AiResponse.title === "NON-INFECTED"
                      ? "Buy Skin Care Products"
                      : "Consult a Doctor"}
                  </Link>
                </Button>,
                <Button key="upload" onClick={() => setResponse("")}>
                  Upload Another
                </Button>,
              ]}
            />
            <div className=" sm:w-2/3 border p-5 shadow rounded-md">
              <div>
                <h1 className="text-2xl text-center font-bold">Report</h1>
              </div>

              <div className="flex justify-between ">
                <div>
                  <h1>Cancer Type : {AiResponse.title}</h1>
                  <h1>Report ID : {AiResponse.id}</h1>
                </div>
                <Progress type="circle" percent={AiResponse.percentage} />
              </div>
              <p className="   w-full ">
                {`Our analysis indicates signs of a potential skin condition called  ${AiResponse.title}.  we strongly recommend consulting with a dermatologist or Skin Cancer specialist for a comprehensive evaluation and appropriate treatment. Early detection and professional guidance are key to managing skin health effectively.`}
              </p>
              <p>{AiResponse.description}</p>
              <p className=" text-red-500">
                Attention : This is an AI Generated report. Always Consult
                Docter before taking any meditation
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="flex flex-col items-center m-3 text-center">
          <h1 className="bold text-4xl m-3">SkinGuardian</h1>
          <p className="text-xl">
            Get Your Skin Checked with AI-Powered Analysis
          </p>
          <p className="mb-10">
            Upload a picture, get instant results, and consult with a doctor or
            shop for skin care products
          </p>
        </div>
        <div className="flex justify-center mb-4 sm:mb-0">
          <div
            className="flex bg-inherit shadow-lg w-full sm:w-3/4 border-dashed border-2 border-White items-center sm:p-10 flex-col px-4 sm:px-20 justify-center h-52 sm:h-auto text-gray-300 rounded"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              className="hidden"
              type="file"
              accept="image/*"
              name="file"
              id="imageupload"
              ref={fileInputRef}
              onChange={(event) => handleFileSelection(event)}
            />
            <p className="py-2 text-White sm:text-3xl text-base my-2 font-semibold px-2 sm:px-4">
              Drop your image here!
            </p>
            {image && (
              <div className="mt-2 flex">
                <p className="text-sm text-White pt-4">{imageName}</p>
                <img
                  src={document}
                  alt="Preview"
                  className="mt-2 text-White rounded-lg h-[40px] w-[40px]"
                />
                <svg
                  onClick={clearFileHandler}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#00000"
                  className="bi bi-x text-lg cursor-pointer"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 1 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <label
            htmlFor="imageupload"
            className="text-white mx-12 relative z-10 px-7 sm:text-lg sm:-mt-6 -mt-10 bg-InputColor p-2 justify-center text-sm"
          >
            Upload Image
          </label>
        </div>
      </div>
      <div className=" flex justify-center my-4">
        <button className="btn mb-4" onClick={handleTakePhoto}>
          Take Image
        </button>
      </div>
      <div className=" flex justify-center">
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>

      {isTakingPhoto && (
        <div
          className=" bg-black/70 z-20 flex justify-center items-center top-0 left-0
         absolute w-full min-h-screen"
        >
          <div className="flex flex-col bg-white rounded-lg h-auto w-[500px] relative p-6">
            <div
              className="absolute top-2 right-2 hover:cursor-pointer"
              onClick={handleInnerClose}
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
            <div className="mt-4 flex flex-col justify-center items-center w-full">
              <>
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
            </div>
            <span className=" text-red-500 text-sm">
              {" "}
              IMPORTANT In order to get accurate result your camera must be
              above 12mp
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
