import React, { createContext, useState } from "react";

export const EventContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [event, setEvent] = useState({
    displayName: "Neil",
    username: "neil123",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
