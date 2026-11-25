import { useState } from "react";
interface PropiedadesHero {
  alExplorar?: () => void;
}
export const HeroBanner = ({ alExplorar }: PropiedadesHero) => {
  const [copiado, setCopiado] = useState(false);
  const copiarCupon = () => {
    navigator.clipboard.writeText("LUMINA15");
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };
  const hacerScrollAlCatalogo = () => {
    if (alExplorar) {
      alExplorar();
    } else {
      const elemento = document.getElementById("seccion-catalogo");
      if (elemento) {
        elemento.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
}