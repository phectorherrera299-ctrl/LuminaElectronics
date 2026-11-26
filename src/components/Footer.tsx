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
      setTimeout(() => setSuscrito(false), 3500);
    }
  };

  const irA = (seccion: string) => {
    if (alNavegar) {
      alNavegar(seccion);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white border-t border-primary-500/20 mt-20 overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo/logoLumina.png"
                alt="Lumina Electronics Logo"
                className="w-12 h-12 object-contain drop-shadow-md"
              />
              <div>
                <span className="font-heading font-extrabold text-white text-xl leading-none block">
                  Lumina
                </span>
                <span className="text-[10px] tracking-widest text-primary-300 uppercase font-bold block mt-0.5">
                  Electronics
                </span>
              </div>
            </div>
            <p className="text-xs text-indigo-200 leading-relaxed max-w-sm">
              Vanguardia tecnológica en componentes de cómputo, dispositivos
              inteligentes y sonido premium. Diseñado con precisión y despacho
              prioritario para creadores y entusiastas tech.
            </p>
            <div className="flex items-center gap-2 pt-2 text-indigo-300">
              <div className="w-10 h-6 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-bold shadow-xs">
                VISA
              </div>
              <div className="w-10 h-6 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-bold shadow-xs">
                MC
              </div>
              <div className="w-10 h-6 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-bold shadow-xs">
                AMEX
              </div>
              <div className="w-10 h-6 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-bold shadow-xs">
                PP
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-heading font-bold text-primary-300 text-xs uppercase tracking-wider">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-xs text-indigo-200">
              <li>
                <button
                  type="button"
                  onClick={() => irA("catalogo")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Catálogo Completo
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => irA("nosotros")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sobre Nosotros
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => irA("admin")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Panel Administrativo
                </button>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-heading font-bold text-primary-300 text-xs uppercase tracking-wider">
              Soporte &amp; Legal
            </h3>
            <ul className="space-y-2.5 text-xs text-indigo-200">
              <li>
                <button
                  type="button"
                  onClick={() => irA("ayuda")}
                  className="hover:text-white cursor-pointer transition-colors text-left"
                >
                  Centro de Ayuda
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => irA("garantias")}
                  className="hover:text-white cursor-pointer transition-colors text-left"
                >
                  Garantías &amp; Devoluciones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => irA("terminos")}
                  className="hover:text-white cursor-pointer transition-colors text-left"
                >
                  Términos y Condiciones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => irA("privacidad")}
                  className="hover:text-white cursor-pointer transition-colors text-left"
                >
                  Política de Privacidad
                </button>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-heading font-bold text-primary-300 text-xs uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-xs text-indigo-200 leading-relaxed">
              Suscríbete para recibir lanzamientos exclusivos, ofertas privadas
              y cupones de descuento especiales.
            </p>
            <form onSubmit={manejarSuscripcion} className="flex gap-2 pt-1">
              <input
                type="email"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 px-3.5 py-2.5 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-indigo-300/80 focus:outline-none focus:border-primary-400 focus:bg-white/20 focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-indigo-600 hover:from-primary-600 hover:to-indigo-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md hover:scale-105"
              >
                Suscribir
              </button>
            </form>
            {suscrito && (
              <p className="text-[11px] font-semibold text-tertiary-300 animate-fade-in flex items-center gap-1">
                <span>✓</span> ¡Gracias por suscribirte al ecosistema Lumina!
              </p>
            )}
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-indigo-300/90">
          <p>
            © {new Date().getFullYear()} Lumina Electronics. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span className="hover:text-white cursor-pointer transition-colors">
              Seguridad SSL 256-bit
            </span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Soporte Lumina 24/7
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
