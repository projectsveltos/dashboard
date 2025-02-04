import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  const authenticate = (authToken: string) => {
    localStorage.setItem("authToken", authToken);
    navigate("/sveltos");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return { authenticate, logout };
};

export default useAuth;
