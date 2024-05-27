import { createContext, useContext } from "react";
import { User } from "@/lib/definitions";

export interface IUser extends User {
  accessToken: string;
}

export interface IState {
  user?: IUser;
  login: Function;
  logOut: Function;
  error: string | null;
}

const initialState: IState = {
  user: {
    _id: "",
    email: "",
    accessToken: "",
  },
  error: "",
  login: () => {},
  logOut: () => {},
};

export const AuthContext = createContext(initialState);

export const useAuthContext = () => useContext(AuthContext);
