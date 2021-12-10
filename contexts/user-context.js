import React, { createContext, useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    displayName: "Neil",
    username: "neil123",
    pronouns: "He/him",
    dateOfBirth: "01/02/1993",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
