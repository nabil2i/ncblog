import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authSatus } from "../../app/features/auth/authSlice";
import useAuth from "../../hooks/useAuth";

interface Props {
  // children: ReactNode;
  allowedRoles?: string[];
}

const RequireAuth = ({ allowedRoles }: Props) => {
  const location = useLocation();
  const { roles } = useAuth();
  const isAuthenticated = useSelector(authSatus);

  let content;
  // console.log("user roles: ", roles)
  // console.log(isAuthenticated)

  if (isAuthenticated) {
    if (allowedRoles) {
      // console.log("allowed roles", allowedRoles)

      if (roles.some((role) => allowedRoles.includes(role))) {
        // console.log('Authorized')
        content = <Outlet />;
      } else {
        // console.log('Not Authorized')
        content = <Navigate to="/login" state={{ from: location }} replace />;
      }
    } else {
      // if no role is required
      content = <Outlet />;
    }
  } else { 
    // if the user is not authenticated
    content = <Navigate to="/login" state={{ from: location }} replace />;
  }
  return content;
};

export default RequireAuth;

// import { ReactNode } from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";

// interface Props {
//   allowedRoles: string[];
// }

// const RequireAuth = ({ allowedRoles }: Props) => {
//   const location = useLocation();
//   const { roles } = useAuth();

//   const content = roles.some((role) => allowedRoles.includes(role)) ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );

//   return content;
// };

// export default RequireAuth;
