// purpose of this hook is to close the models
// when ever there is click outside the model it  will close the model

import React, { useRef, useEffect } from "react";

export function useCloseRef(ref, setStateFunction) {
  // const ref = useRef(null)
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setStateFunction(false);
    }
  };

  useEffect(() => {
    console.log("hello ref");
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
}
