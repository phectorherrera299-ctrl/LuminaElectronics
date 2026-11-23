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
    <footer className="bg-white border-t border-secondary-200 mt-20">
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
            <p className="text-xs text-secondary-500 leading-relaxed max-w-sm">
              Vanguardia tecnológica en componentes de cómputo, dispositivos
              inteligentes y sonido premium. Diseñado con precisión y despacho
              prioritario.
            </p>
            <div className="flex items-center gap-2 pt-2 text-secondary-400">
              <div className="w-8 h-5 rounded border border-secondary-200 flex items-center justify-center text-[9px] font-bold">
                VISA
              </div>
              <div className="w-8 h-5 rounded border border-secondary-200 flex items-center justify-center text-[9px] font-bold">
                MC
              </div>
              <div className="w-8 h-5 rounded border border-secondary-200 flex items-center justify-center text-[9px] font-bold">
                AMEX
              </div>
              <div className="w-8 h-5 rounded border border-secondary-200 flex items-center justify-center text-[9px] font-bold">
                PP
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-heading font-bold text-secondary-900 text-xs uppercase tracking-wider">
              Navegación
            </h3>
            <ul className="space-y-2 text-xs text-secondary-500">
              <li>
                <button
                  type="button"
                  onClick={() => irA("catalogo")}
                  className="hover:text-primary-600 transition-colors cursor-pointer"
                >
                  Catálogo Completo
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => irA("catalogo")}
                  className="hover:text-primary-600 transition-colors cursor-pointer"
                >
                  Ofertas Especiales
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => irA("nosotros")}
                  className="hover:text-primary-600 transition-colors cursor-pointer"
                >
                  Sobre Lumina
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => irA("admin")}
                  className="hover:text-primary-600 transition-colors cursor-pointer"
                >
                  Panel Administrativo
                </button>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-heading font-bold text-secondary-900 text-xs uppercase tracking-wider">
              Soporte &amp; Legal
            </h3>
            <ul className="space-y-2 text-xs text-secondary-500">
              <li className="hover:text-secondary-900 cursor-pointer transition-colors">
                Centro de Ayuda
              </li>
              <li className="hover:text-secondary-900 cursor-pointer transition-colors">
                Garantías &amp; Devoluciones
              </li>
              <li className="hover:text-secondary-900 cursor-pointer transition-colors">
                Términos y Condiciones
              </li>
              <li className="hover:text-secondary-900 cursor-pointer transition-colors">
                Política de Privacidad
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
