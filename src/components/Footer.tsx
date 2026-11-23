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

  return (
    <footer  className="bg-white border-t border-secondary-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary-500 text-white font-heading font-extrabold flex items-center justify-center text-base shadow-xs">
                L
              </div>
              <span className="font-heading font-extrabold text-secondary-900 text-lg">
                Lumina Commerce
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}