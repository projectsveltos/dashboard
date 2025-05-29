import { Navigate, useLocation } from "react-router-dom";
const PreserveSearchNavigate = ({ to }: { to: string }) => {
  const location = useLocation();
  const searchParams = location.search; // Get current search params

  return <Navigate to={`${to}${searchParams}`} />;
};

export default PreserveSearchNavigate;
