import React, { createContext, useContext, useState } from 'react';

export const MyContext = createContext();



export function MyContextProvider({ children }) {
  const [sharedData, setSharedData] = useState("Initial shared data");

  return (
    <MyContext.Provider value={{ sharedData, setSharedData }}>
      {children}
    </MyContext.Provider>
  );
  
}
