import React, { createContext, useState } from "react";

export const ViewedUserContext = React.createContext();

export const ViewedUserProvider = ({ children }) => {
  const [viewedUser, setViewedUser] = useState({});
  return (
    <ViewedUserContext.Provider value={{ viewedUser, setViewedUser }}>
      {children}
    </ViewedUserContext.Provider>
  );
};
