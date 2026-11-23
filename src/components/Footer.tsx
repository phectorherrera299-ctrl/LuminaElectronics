import { useState, type FormEvent } from "react";

interface PropiedadesFooter {
  alNavegar?: (seccion: string) => void;
}

export const Footer = ({ alNavegar }: PropiedadesFooter) => {
  const [correo, setCorreo] = useState("");
  const [suscrito, setSuscrito] = useState(false);

  const manejarSuscripcion = (e: FormEvent) => {
    e.preventDefault();
    if (correo.trim()) {
      setSuscrito(true);
      setCorreo("");
      setTimeout(() => setSuscrito(false), 3000);
    }
  };

  const irA = (seccion: string) => {
    if (alNavegar) {
      alNavegar(seccion);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
};
