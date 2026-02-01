import { Navigate, Outlet } from "react-router-dom";
import { checkauthentication } from "./utils/auth";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const res = await checkauthentication();
      setIsAuth(res);
    };
    verify();
  }, []);

  if (isAuth === null) return null; // or loader
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
