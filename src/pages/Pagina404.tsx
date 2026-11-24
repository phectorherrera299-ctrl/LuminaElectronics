import { useState, type FormEvent } from "react";

interface PropiedadesPagina404 {
  alNavegar?: (seccion: string) => void;
}

export const Pagina404 = ({ alNavegar }: PropiedadesPagina404) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const irA = (seccion: string) => {
    if (alNavegar) {
      alNavegar(seccion);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const manejarBusqueda = (e: FormEvent) => {
    e.preventDefault();
    if (terminoBusqueda.trim()) {
      irA("catalogo");
    }
  };
};
