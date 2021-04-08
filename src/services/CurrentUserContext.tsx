import * as React from "react";
import { UserState } from "./types";

export type CurrentUserContextType = {
  /** Currently authenticated user */
  currentUser: UserState;
  /** Callback to set user in our context */
  setCurrentUser: React.Dispatch<React.SetStateAction<UserState>>;
};

/**
 * Exporting my own function to handle context being initially undefined.
 * Approach taken from this series of articles.
 * https://www.carlrippon.com/react-context-with-typescript-p4/
 */
export function createCtx<CurrentUserContextType>() {
  const ctx = React.createContext<CurrentUserContextType | undefined>(
    undefined
  );
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error("useCtx mus be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

const [useCurrentUser, CtxProvider] = createCtx<CurrentUserContextType>();

/** Provider Component to wrap App component in at index level */
export const CurrentUserProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState<UserState>(null);

  return (
    <CtxProvider value={{ currentUser, setCurrentUser }}>
      {children}
    </CtxProvider>
  );
};

/** Expose a custom hook to consume Context */
export const useCurrentUserContext = () => useCurrentUser();