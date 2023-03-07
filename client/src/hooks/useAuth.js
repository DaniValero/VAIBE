import { createContext, useContext, useReducer } from "react";
import user from "../services/userService";

const currentUser = user.getCurrentUser();

const initialState = !currentUser
  ? { isAuth: false }
  : currentUser.isAdmin
  ? { isAuth: true, isAdmin: true }
  : { isAuth: true };

const AuthContext = createContext(initialState);
AuthContext.displayName = "AuthContext";

export function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { isAuth: true };
    case "admin":
      return { isAuth: true, isAdmin: true };
    case "logout":
      return { isAuth: false };
    default:
      throw new Error();
  }
}

export function AuthProvider({ children }) {
  const [auth, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={[auth, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
}

export default function AuthConsumer() {
  return useContext(AuthContext);
}
