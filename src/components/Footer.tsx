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
          <div className="lg:col-span-4 space-y-4 ">
            <div className="flex items-center gap-2">
              <img
                src="/logo/logoLumina.png"
                alt="Lumina Electronics Logo"
                className="w-15 h-15 object-contain"
              />
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
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-heading font-bold text-secondary-900 text-xs uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-xs text-secondary-500">
              Suscríbete para recibir lanzamientos exclusivos y cupones de
              descuento.
            </p>
            <form onSubmit={manejarSuscripcion} className="flex gap-2 pt-1">
              <input
                type="email"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 px-3 py-2 text-xs bg-secondary-50 border border-secondary-200 rounded-xl text-secondary-900 placeholder:text-secondary-400 focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Suscribir
              </button>
            </form>
            {suscrito && (
              <p className="text-[11px] font-semibold text-tertiary-600 animate-fade-in">
                ✓ ¡Gracias por suscribirte a Lumina!
              </p>
            )}
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-secondary-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary-400">
          <p>
            © {new Date().getFullYear()} Lumina Commerce. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-secondary-600">
              Proyecto Académico RollingCode
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 text-secondary-500">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-500" />
              Sistema Operativo v2.4
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
