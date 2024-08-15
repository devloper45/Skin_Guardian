import React, { useState, useRef, useEffect } from "react";
import Logo from "../../assets/logo.png";
import toast from "react-hot-toast";
import SideBarrr from "../SideBarrr";
import CopyToClipboard from "../../utils/CopyToClipboard";
import DownloadAsPdf from "../../utils/DownloadAsPdf";
import Api from "../ProtectRoute/Api";
// import SideBar from './sidebar';

const CustomReport = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState("");
  const [openBar, setOpenBar] = useState(false);
  // const [uploadedFile, setUploadedFile] = useState(null);
  const [file, setFile] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesContainerRef = useRef(null);
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Generate your Finiancial Report"
  );

  const handleFileUpload = async (event) => {
    console.time("fileUploadTime");
    console.log("hebnb");
    let selectedFile = event.target.files[0];
    if (!selectedFile) return toast.error("Failed to upload file");
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "application/docs",
      "text/plain",
    ];
    // console.log(id);

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Only PDF, DOCX, DOC, and TXT files are allowed.");
      return;
    }

    const userId = localStorage.getItem("userId");
    console.log(userId);

    setFile(selectedFile);
    // console.log(file);
    console.log(selectedFile);
    let newModifiedFileName = selectedFile.name.replace(/[_.,]/g, "-");
    newModifiedFileName = newModifiedFileName.toLowerCase();
    console.log(newModifiedFileName);

    // toast.success("File uploaded successfully.");
    localStorage.setItem("document_name", newModifiedFileName);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("user_id", userId);
    formData.append("document_name", newModifiedFileName);
    // console.log(formData);
    setFileLoading(true);
    // console.timeEnd("fileUploadTime");
    // console.time("fileUploadApiTime");

    try {
      // const response = await fetch('https://financialbots.pythonanywhere.com/query-document/', {
      // console.time("ApiTime");
      // const response = await fetch("http://127.0.0.1:8000/query-document/", {
      //   method: "POST",
      //   body: formData,
      // });
      const response = await Api.post("/query-document/", formData);
      // console.timeEnd("ApiTime");
      // console.log(response);

      if (!response.status) {
        console.log("error in embedding queryselector");
        // throw new Error('Failed to upload file');
      } else {
        setFileLoading(false);
        toast.success("file Uploaded ");
        console.timeEnd("fileUploadApiTime");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while uploading the file.");
    }
  };

  useEffect(() => {
    setMessages([]);
    setChatHistory("");
  }, []);
  const sample1 =
    "My organization name is PlugAI. Last revenue of my organization was $30M from last year.";
  const sample2 =
    "My organization name is AugAI. Last revenue of my organization was $10M from last year.";

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      setLoading(true);
      const userMessage = { text: inputValue, sender: "user" };
      const updatedChatHistory = `${chatHistory}user: ${inputValue}\n`;
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setChatHistory(updatedChatHistory);
      setInputValue(""); // Clear input after sending
      setWelcomeMessage(""); // Hide welcome message after sending the first message
      sendMessageToBot(updatedChatHistory);
    }
  };

  const sendMessageToBot = async (updatedChatHistory) => {
    try {
      console.log("Checking", updatedChatHistory);
      let documentName = localStorage.getItem("document_name");
      let userId = localStorage.getItem("userId");
      setLoading(true);
      // const url = `https://financialbots.pythonanywhere.com/CustomReport/${userId}/`;
      // const url = `http://127.0.0.1:8000/CustomReport/${userId}/`;
      // const response = await fetch(url, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     query: updatedChatHistory,
      //     document_name: documentName,
      //   }),
      // });
      const url = `/CustomReport/${userId}/`;

      const response = await Api.post(url, {
        query: updatedChatHistory,
        document_name: documentName,
      });

      // const data = await response.json();
      // console.log("response ");
      // console.log(response);
      const botMessage = { text: response.data.response, sender: "bot" };
      // console.log("bot message = ");
      // console.log(botMessage);
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setChatHistory(
        (prevChatHistory) => `${prevChatHistory}bot: ${response.message}\n`
      );
      setLoading(false);
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
    }
  };
  const handlebottemplate = (svalue) => {
    const userMessage = { text: svalue, sender: "user" };
    const updatedChatHistory = `${chatHistory}user: ${inputValue}\n`;
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setChatHistory(updatedChatHistory);
    setInputValue(""); // Clear input after sending
    setWelcomeMessage(""); // Hide welcome message after sending the first message
    sendMessageToBot(updatedChatHistory);
    console.log(svalue);
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileDelete = () => {
    setFile(null);
    toast.success("File removed successfully!");
  };
  const fileName = file ? file.name : "";

  return (
    <div className="flex">
      {fileLoading && (
        <div className="w-[100vw] min-h-screen absolute flex justify-center items-center top-0 bg-gray-500 bg-opacity-85 ">
          <div className=" loader h-10 "></div>
        </div>
      )}

      <div className={`flex h-screen overflow-hidden w-full `}>
        <SideBarrr openBar={openBar} setOpenBar={setOpenBar} />
        <div
          className={`flex-1 overflow-auto w-full transition-all duration-300 ${
            openBar ? "ml-48" : "ml-10"
          }`}
        >
          <div className="min-h-screen px-5 md:px-14  w-full bg-shadow-lg rounded-t-lg">
            <div
              className={`p-2    rounded-3xl md:px-5 h-[98vh] shadow-2xl flex flex-col overflow-hidden z-10 ${
                openBar ? "" : "md:mx-32"
              }`}
            >
              <div className="px-6 pt-2 pb-1 text-xl md:text-3xl flex justify-center items-center">
                <h3 className="text-white font-bold">
                  Skin-Guardian Report Generator
                </h3>
              </div>
              <div className="w-[90%] border-b self-center border-gray-300"></div>
              <div
                className="flex-1 p-3 overflow-y-auto hide-scrollbar"
                ref={messagesContainerRef}
              >
                {messages.length === 0 && welcomeMessage && (
                  <div className="flex flex-col  justify-center items-center h-full">
                    <div className=" m-3">
                      <img src={Logo} alt="" srcset="" className="w-14" />
                    </div>
                    <p className="text-white">{welcomeMessage}</p>
                    <div className=" flex justify-around w-4/6 ">
                      <div
                        onClick={() => handlebottemplate(sample1)}
                        className="flex border  rounded-2xl   border-white p-2 m-2 my-4 bg-opacity-50 text-white text-center cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-8 m-1"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                          />
                        </svg>
                        <h1 className=" m-1">{sample1}</h1>
                      </div>
                      <div
                        onClick={() => handlebottemplate(sample2)}
                        className="flex border  rounded-2xl   border-white p-2 m-2 my-4 bg-opacity-50 text-white  cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-8 m-1"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>

                        <h1 className=" m-1">{sample2}</h1>
                      </div>
                    </div>
                  </div>
                )}
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded whitespace-pre-wrap text-[#111C36] text-sm max-w-fit ${
                      msg.sender === "user"
                        ? "bg-[#75A48C] ml-auto"
                        : "bg-[#F0F0F0] mr-auto"
                    }`}
                  >
                    <div className="flex flex-col ">
                      <span>{msg.text}</span>
                      <div className=" flex justify-end ">
                        {msg.sender !== "user" && (
                          <div className=" flex">
                            {/* copy to clipboard  */}
                            <CopyToClipboard msgtext={msg.text} />
                            {/* download component */}
                            <DownloadAsPdf
                              filename={fileName}
                              msgtext={msg.text}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  // <div className="mb-2 p-2 rounded whitespace-pre-wrap  text-sm max-w-fit bg-[#F0F0F0] mr-auto">
                  //   <div className="loading-text text-[#111C36] ">
                  //     Generating
                  //     <span className="loading-dots ">
                  //       <span>.</span>
                  //       <span>.</span>
                  //       <span>.</span>
                  //     </span>
                  //   </div>
                  // </div>
                  <div class="animate-pulse flex space-x-4">
                    <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div class="flex-1 space-y-6 py-1">
                      <div class="h-2 bg-slate-200 rounded"></div>
                      <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                          <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                          <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="ml-5">
                {loading && <div className="pulse-loader"></div>}
              </div>
              <div className="flex flex-col bg-white  rounded-xl border ">
                <div>
                  <div className="flex  space-x-2 mb-2">
                    {file && (
                      <div className="flex items-center mt-2">
                        <span className="text-gray-600  border shadow-lg px-3 p-2 mx-2">
                          {file.name}
                        </span>
                        <svg
                          onClick={handleFileDelete}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="ffffff"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-5 -ml-4 -mt-8 bg-red-500 border text-white rounded-full "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex ">
                  <input
                    type="file"
                    id="fileUpload"
                    name="fileUpload"
                    onChange={(event) => handleFileUpload(event)}
                    className="hidden"
                  />
                  <label
                    htmlFor="fileUpload"
                    // onClick={() => console.log("clicked")}
                    className="mx-2 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="28px"
                      viewBox="0 -960 960 960"
                      width="28px"
                      fill="#00000"
                    >
                      <path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z" />
                    </svg>
                  </label>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Write your query to Generate Report ..."
                    className="w-full pl-2 py-2 bg-White  rounded-l-3xl  text-sm outline-none"
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 23 23"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleSendMessage}
                    className="w-8 cursor-pointer h-8 mx-2 p-1 bg-black rounded-full "
                  >
                    <path
                      d="M21.8718 0.816529C21.7117 0.656463 21.5087 0.546086 21.2874 0.498685C21.066 0.451285 20.8356 0.468882 20.624 0.549359L1.04968 7.95818H1.04577C0.820072 8.04499 0.626676 8.19935 0.491992 8.40018C0.357308 8.60101 0.287903 8.83852 0.293257 9.08028C0.29861 9.32203 0.37846 9.55624 0.521902 9.75091C0.665344 9.94558 0.865383 10.0912 1.0947 10.168L1.11476 10.1743L7.83315 13.0432C7.96419 13.083 8.10337 13.0877 8.2368 13.0569C8.37023 13.0261 8.49325 12.9608 8.59356 12.8676L19.3763 2.8203C19.4084 2.78817 19.4465 2.76269 19.4885 2.7453C19.5305 2.72791 19.5755 2.71896 19.6209 2.71896C19.6664 2.71896 19.7114 2.72791 19.7533 2.7453C19.7953 2.76269 19.8335 2.78817 19.8656 2.8203C19.8977 2.85243 19.9232 2.89057 19.9406 2.93255C19.958 2.97453 19.9669 3.01953 19.9669 3.06496C19.9669 3.1104 19.958 3.15539 19.9406 3.19737C19.9232 3.23935 19.8977 3.27749 19.8656 3.30962L9.81784 14.0874C9.72462 14.1877 9.65933 14.3108 9.62851 14.4442C9.59768 14.5776 9.6024 14.7168 9.64218 14.8478L12.512 21.5701C12.515 21.5799 12.5179 21.5887 12.5213 21.598C12.6779 22.0516 13.0743 22.3717 13.5533 22.3932C13.5744 22.3932 13.5817 22.3932 13.6023 22.3932C13.8441 22.3946 14.0808 22.3232 14.2815 22.1882C14.4822 22.0533 14.6377 21.8612 14.7277 21.6367L22.1355 2.06773C22.2172 1.85599 22.2357 1.62513 22.1889 1.40308C22.1421 1.18104 22.0319 0.977304 21.8718 0.816529Z"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomReport;
