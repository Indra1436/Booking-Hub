import React, { createContext, useState } from "react";

export const ContextData = createContext();

export const ContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fullName,setFullName] = useState("")
 
  return (
    <ContextData.Provider value={{ searchTerm, setSearchTerm, fullName, setFullName }}>
      {children}
    </ContextData.Provider>
  );
};
