import { UserState } from "./User";

/** Props for AppBar authentication */
export type AppBarProps = {
  /** Currently logged in user */
  currentUser: UserState;
  /** Callback to pass AccountMenu for handling log in */
  onLogin: React.Dispatch<React.SetStateAction<UserState>>;
  /** Callback to pass to AccountMenu for handling logging out */
  onLogout: () => void;
};
