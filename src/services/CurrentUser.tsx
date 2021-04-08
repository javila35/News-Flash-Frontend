import * as React from "react";
import { UserState } from "./types";

type ContextType = {
  /** Currently authenticated user */
  currentUser: UserState;
  /** Callback to set user in our context */
  setCurrentUser: React.Dispatch<React.SetStateAction<UserState>>;
  /** Callback to remove user in our context */
  removeCurrentUser: () => void;
};

export const UserContext = React.createContext<ContextType | undefined>(
  undefined
);

export const UserProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState<UserState>(null);

  /** Method to pass AppBar for logout */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  /** Building object for our Context.Provider */
  const providerValue = {
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
    removeCurrentUser: handleLogout,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
