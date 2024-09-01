import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OnlyAdminPrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser && currentUser?.result?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default OnlyAdminPrivateRoute;
