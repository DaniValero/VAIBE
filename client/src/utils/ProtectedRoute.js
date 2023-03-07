import { Navigate } from "react-router-dom";
import AuthConsumer from "../hooks/useAuth";

const ProtectedRoute = ({ isAllowed, children }) => {
  const [user] = AuthConsumer();

  if (user[isAllowed]) return children;
  if (isAllowed === "isNotAuth" && !user.isAuth) return children;

  // return <Navigate to="/" replace />; Comentado para solventar que el Login te lleve a Landing Page
};

export default ProtectedRoute;
