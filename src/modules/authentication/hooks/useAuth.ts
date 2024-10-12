import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  const authenticate = (authToken: string) => {
    localStorage.setItem("authToken", authToken);
    navigate("/sveltos");
  };

  return { authenticate };
};

export default useAuth;
