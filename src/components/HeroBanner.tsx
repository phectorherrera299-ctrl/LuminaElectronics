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
          </div>
        </div>
      </div>
    </section>
  );
};
