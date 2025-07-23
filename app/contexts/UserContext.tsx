"use client";

import { createContext, useContext, ReactNode } from "react";

interface User {
  name?: string;
  email?: string;
}

interface UserContextValue {
  user: User | null;
}

const UserContext = createContext<UserContextValue>({
  user: null,
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // For this demo, we don't need user authentication
  const user = null;

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};