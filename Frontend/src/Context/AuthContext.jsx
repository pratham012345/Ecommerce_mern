/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  let [user, setUser] = useState(null);
  let [isAuthenticated, setisAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setisAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within ans AuthProvide");
  }
  return context;
}

export default {AuthProvider, useAuth}