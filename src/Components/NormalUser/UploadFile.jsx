import React, { useState, useRef } from "react";
import Chat from "../Chat";
import document from "../../assets/document.png";
// import SideBar from "../sidebar";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import SideBarrr from "../SideBarrr";
import ChatRobo from "../../assets/roboimg.png";
import bg from "../../assets/bgupload.png";
import Tooltip from "../../utils/tooltip";
import CopyToClipboard from "../../utils/CopyToClipboard";
import Api from "../ProtectRoute/Api";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [chat, setChat] = useState(false);
  const [chatButton, setChatButton] = useState(false);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [ModifiedFileName, setModifiedFileName] = useState("");
  const [openBar, setOpenBar] = useState(false);

  const fileInputRef = useRef(null);
  const id = useParams();
  console.log(id);

  const handleFileChange = async (e) => {
    let selectedFile = e.target.files[0];
    if (!selectedFile) return toast.error("Failed to upload file");
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "application/docs",
      "text/plain",
    ];
    console.log(id);

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Only PDF, DOCX, DOC, and TXT files are allowed.");
      return;
    }

    const userId = localStorage.getItem("userId");

    setFile(selectedFile);
    let newModifiedFileName = selectedFile.name.replace(/[_.,]/g, "-");
    newModifiedFileName = newModifiedFileName.toLowerCase();
    setModifiedFileName(newModifiedFileName);

    toast.success("File uploaded successfully.");
    localStorage.setItem("document_name", newModifiedFileName);
    console.log(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("user_id", userId);
    formData.append("document_name", newModifiedFileName);

    try {
      // const response = await fetch('https://financialbots.pythonanywhere.com/query-document/', {

      // const response = await fetch("http://127.0.0.1:8000/query-document/", {
      //   method: "POST",
      //   body: formData,
      // });
      const response = await Api.post("/query-document/", formData);

      if (!response.ok) {
        console.log("error in embedding queryselector");
        // throw new Error('Failed to upload file');
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while uploading the file.");
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

  const chatBotHandler = () => {
    setChat((prevChat) => !prevChat);
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast("Please upload a file first.");
      return;
    }

    setLoading(true);
    setChatButton(true); // Start loading
    const formData = new FormData();
    formData.append("file", file);

    try {
      // const response = await fetch("http://127.0.0.1:8000/summarize-pdf/", {
      //   // const response = await fetch('https://financialbots.pythonanywhere.com/summarize-pdf/', {
      //   method: "POST",
      //   body: formData,
      // });
      const response = await Api.post("/summarize-pdf/", formData);
      console.log("no response");
      console.log(response.data.summary);
      const data = response.data.summary;
      console.log("data is here " + data);
      setSummary(data);

      // if (!response.ok) {
      //   throw new Error("Failed to fetch summary");
      // }
      // console.log(response.summary + "response ");

      // const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while analyzing the file.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const clearFileHandler = () => {
    setFile(null);
    setChatButton(false);
    setSummary("");
    localStorage.removeItem("document_name");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className=" flex min-h-screen   text-white"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex  overflow-hidden w-full">
        <SideBarrr openBar={openBar} setOpenBar={setOpenBar} />
        <div
          className={`flex-1 overflow-auto w-full transition-all duration-300 ${
            openBar ? "ml-48" : "ml-10"
          }`}
        >
          <div className="sm:mb-16 md:mb-10 lg:mb-1   p-4 py-6 justify-center">
            <div className="flex flex-col items-center m-3 text-center">
              {id.id == 1 && (
                <h1 className="bold text-4xl m-3">Your Financial Assistant </h1>
              )}
              {id.id == 2 && (
                <h1 className="bold text-4xl m-3">Your Insurance Assistant </h1>
              )}
              {id.id == 3 && (
                <h1 className="bold text-4xl m-3">Your Generic Assistant </h1>
              )}

              <p className="text-xl">Upload your Document </p>
              <p className="mb-10">
                Get your financial Summary and get help from your own Personal
                AI Assistant{" "}
              </p>
            </div>
            <div className="flex justify-center  mb-4 sm:mb-0">
              <div
                className="flex  bg-inherit shadow-lg w-3/4 border-dashed border-2 border-white items-center p-10 flex-col px-20 justify-center h-52 sm:h-auto  text-gray-300 rounded"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  className="hidden"
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  name="file"
                  id="imageupload"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <p className="py-2 text-white sm:text-3xl text-base my-2 font-semibold px-4">
                  Drop your files here!
                </p>
                {file && (
                  <div className="mt-2 flex">
                    <p className="text-sm text-white pt-4">{file.name}</p>
                    <img
                      src={document}
                      alt="Preview"
                      className="mt-2 text-white rounded-lg h-[40px] w-[40px]"
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
                <label
                  htmlFor="imageupload"
                  className="text-white mx-12 relative mt-12 px-7 sm:text-lg mb-[-59px] bg-[#75A48C]  p-2 justify-center  text-sm sm:text-base"
                >
                  Upload File
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              className="text-white mx-12 m-5 bg-[#75A48C] hover:bg-[#618673] p-2 px-4 rounded-full text-sm sm:text-base"
            >
              Analyze
            </button>
          </div>
          {summary ? (
            <div className="m-2 justify-center flex items-center flex-col">
              {/* <h1>Summary : </h1> */}
              <textarea
                className={` border-[#A1A1A1] text-justify border-2 outline-none w-3/4 mx-5 bg-inherit shadow-lg rounded-3xl p-3 ${
                  loading ? "loading-text" : ""
                }`}
                name="textarea"
                id=""
                cols="28"
                rows="10"
                value={summary} // Conditionally render loader or summary
                readOnly
              ></textarea>
              <div className="relative z-10 bottom-8  right-2 flex justify-end w-3/4 ">
                <CopyToClipboard msgtext={summary} />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center ">
              {loading && (
                <div className="loading-dots flex">
                  <p className="text-white">
                    Loading<span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {chatButton && (
        <div className="absolute bottom-4 right-4 chatbot">
          <Tooltip text="Want to Chat! Your AI Assistant is here">
            {chat && (
              <Chat
                onClose={chatBotHandler}
                ModifiedfileName={ModifiedFileName}
              />
            )}
            {/* <button
            onClick={chatBotHandler}
            className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
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
          {/* <div className="h-3 w-3 animate-ping fixed  bg-green-500 -mb-2 rounded-full"></div> */}
        </div>
      )}
    </div>
  );
};

export default UploadFile;
