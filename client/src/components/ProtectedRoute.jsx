// import React, { useEffect } from "react";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { isTokenExpired, showToast } from "../utils/config";

// const ProtectedRoute = ({ children }) => {
//   const location = useLocation();
//   const token = localStorage.getItem("token");
//   const nevigate = useNavigate();
 
//   useEffect(() => {
//     if(token){
//  const interval = setInterval(() => {
//       if (isTokenExpired(token)) {
//         localStorage.clear();
//         showToast("Session expired. Please login again.", "error");
//         clearInterval(interval);
//         nevigate("/login");
//       }
//     }, 60000);

//     return () => clearInterval(interval);
//     }
   
//   }, []);

//   if (!token || isTokenExpired(token)) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;




import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { isTokenExpired, showToast } from "../utils/config";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; 

    const interval = setInterval(() => {
      const currentToken = localStorage.getItem("token"); 
      if (isTokenExpired(currentToken)) {
        localStorage.clear();
        showToast("Session expired. Please login again.", "error");
        clearInterval(interval);
        navigate("/login");
      }
    }, 60000); 

    return () => clearInterval(interval);
  }, [navigate]);

  const token = localStorage.getItem("token"); 

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;