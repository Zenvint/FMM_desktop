import React, { useEffect } from "react";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "notistack";

const RequireAuth = ({ allowedRoles }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const { roles } = useAuth();
  const isSuccess = roles.some((role) => allowedRoles.includes(role));

  useEffect(() => {
    if (!isSuccess) {
      enqueueSnackbar(
        `Your Role does not permit you have access to this content`,
        { variant: "warning" }
      );
    }
  }, [isSuccess]);

  const content = isSuccess ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );

  return content;
};

export default RequireAuth;
