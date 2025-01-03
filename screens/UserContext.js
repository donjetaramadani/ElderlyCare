import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profileImage: "",
    token: "", // Store the user's authentication token
  });

  /**
   * Update user data (e.g., name, email, token)
   * @param {Object} updatedData - The updated user data
   */
  const updateUser = (updatedData) => {
    setUser((prevState) => ({
      ...prevState,
      ...updatedData, // Merge the new data into the existing user object
    }));
  };

  /**
   * Reset user data on logout
   */
  const logout = () => {
    setUser({
      name: "",
      email: "",
      profileImage: "",
      token: "", // Clear the token on logout
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
