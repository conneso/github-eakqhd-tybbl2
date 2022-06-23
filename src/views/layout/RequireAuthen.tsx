import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "src/services/auth.service";

export function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth.token) {
      // Nếu chưa có thông tin user thì chuyển về màn hình login
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }