import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profileImage: "",
  });

  const updateUser = (updatedData) => {
    setUser((prevState) => ({ ...prevState, ...updatedData }));
  };

  const logout = () => {
    setUser({
      name: "",
      email: "",
      profileImage: "",
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
