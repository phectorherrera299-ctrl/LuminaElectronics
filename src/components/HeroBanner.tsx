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
  };

  return (
    <section className="bg-gradient-to-b from-white to-secondary-50/60 border-b border-secondary-200/70 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200/60 text-primary-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
              Innovación &amp; Precisión Minimalista
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-secondary-900 tracking-tight leading-[1.1]">
              Tecnología de{" "}
              <span className="text-primary-500">Próxima Generación</span> en
              tus Manos.
            </h1>
            <p className="text-secondary-600 text-sm sm:text-base max-w-xl leading-relaxed">
              Descubre nuestra selección exclusiva de estaciones de trabajo,
              audio inmersivo y periféricos inteligentes concebidos para
              entusiastas y creadores de alto impacto.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={hacerScrollAlCatalogo}
                className="px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explorar Catálogo</span>
                <span>↓</span>
              </button>
              <button
                type="button"
                onClick={copiarCupon}
                className="px-4 py-3 rounded-xl bg-white border border-secondary-200 hover:bg-secondary-50 text-secondary-800 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>🏷️</span>
                <span>
                  {copiado
                    ? "¡Copiado al portapapeles!"
                    : "LUMINA15 (Copia 15% OFF)"}
                </span>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-secondary-200/60 max-w-lg">
              <div className="space-y-0.5">
                <span className="font-heading font-bold text-secondary-900 text-sm block">
                  Envío Gratis
                </span>
                <span className="text-[11px] text-secondary-500 block">
                  En órdenes &gt; $50
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="font-heading font-bold text-secondary-900 text-sm block">
                  30 Días
                </span>
                <span className="text-[11px] text-secondary-500 block">
                  Garantía sin costo
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="font-heading font-bold text-secondary-900 text-sm block">
                  Soporte 24/7
                </span>
                <span className="text-[11px] text-secondary-500 block">
                  Especialistas Lumina
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-secondary-900 to-secondary-800 p-1 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                alt="Colección Studio & Acústica"
                className="w-full aspect-4/3 object-cover rounded-[22px] opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/80 via-transparent to-transparent rounded-[22px]" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] tracking-widest uppercase font-bold text-primary-300 block">
                  DESTACADO DE LA SEMANA
                </span>
                <h3 className="font-heading font-bold text-lg text-white">
                  Colección Studio &amp; Acústica
                </h3>
                <p className="text-xs text-secondary-300 mt-0.5">
                  Cancelación activa adaptativa y sonido de alta fidelidad.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-3 border border-secondary-200 shadow-lg hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary-50 text-tertiary-600 flex items-center justify-center font-bold text-sm">
                ★
              </div>
              <div className="text-xs">
                <span className="font-bold text-secondary-900 block font-heading">
                  +1,400 Reviews
                </span>
                <span className="text-secondary-500 block text-[11px]">
                  Promedio 4.9/5.0 Estrellas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
