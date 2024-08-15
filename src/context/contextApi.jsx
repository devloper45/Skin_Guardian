import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  // const [userRole, setUserRole] = useState(
  //   localStorage.getItem("userRole") === "true"
  // );
  const [userRole, setUserRole] = useState(
   
  );
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole") === "true";
    setUserRole(storedUserRole);
    console.log("from contextapi useEffect: ", storedUserRole);
    console.log("userRole: ", userRole);
  }, []);

  return (
    <UserContext.Provider
      value={{ userRole, setUserRole, userToken, setUserToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

// // UserContext.js
// import React, { createContext, useState, useEffect } from "react";

// const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const [userRole, setUserRole] = useState(true);
//   const [userTokken, setUserTokken] = useState("");
//   useEffect(() => {
//     const useRole = localStorage.getItem("userRole");
//     setUserRole((useRole) => useRole);
//     console.log("from contextapi useeffect " + useRole + "ds");
//     console.log(userRole);
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{ userRole, setUserRole, userTokken, setUserTokken }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserContext, UserProvider };
