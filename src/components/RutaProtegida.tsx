import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAutenticacion } from "../context/ContextoAutenticacion";

interface RutaProtegidaProps {
  children: ReactNode;
  requiereAdmin?: boolean;
}

export function RutaProtegida({
  children,
  requiereAdmin = true,
}: RutaProtegidaProps) {
  const { usuario, esAdmin } = useAutenticacion();
  const location = useLocation();

  if (usuario.rol === "Invitado") {
    return <Navigate to="/login" state={{ desde: location }} replace />;
  }
  if (requiereAdmin && !esAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}