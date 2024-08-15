import React, { useState } from "react";

const Tooltip = ({ children, text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className="fixed border-white border right-10 z-20 bottom-28  mt-2 w-max px-2 py-2 text-sm bg-[#213129] text-white rounded-md shadow-lg ">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
