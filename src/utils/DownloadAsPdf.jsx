import React from "react";

export default function DownloadAsPdf({ filename, msgtext }) {
  const downloadMessageAsPdf = (text) => {
    const printWindow = window.open("", "", "width=600,height=400");
    printWindow.document.write(
      `<html><head><title>Your Report</title></head><body><h1>${filename}</h1><br/> ${text}</body></html>`
    );
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div>
      <svg
        onClick={() => downloadMessageAsPdf(msgtext)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 cursor-pointer white"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  );
}
