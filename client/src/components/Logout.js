import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import user from "../services/userService";
import AuthConsumer from "../hooks/useAuth";

const Logout = () => {
  const [, dispatch] = AuthConsumer();
  const navigate = useNavigate();

  useEffect(() => {
    user.logout();

    dispatch({ type: "logout" });
    navigate("/");
  }, []);

  return null;
};

export default Logout;
