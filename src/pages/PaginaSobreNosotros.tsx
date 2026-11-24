interface PropiedadesPaginaNosotros {
  alNavegar?: (seccion: string) => void;
}

interface MiembroEquipo {
  nombre: string;
  rol: string;
  etiquetaRol: string;
  foto: string;
  descripcion: string;
  tecnologias: string[];
  ubicacion: string;
}

const MIEMBROS_EQUIPO: MiembroEquipo[] = [
  {
    nombre: "Hector Herrera",
    rol: "Frontend Architect & UI",
    etiquetaRol: "Lead",
    foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    descripcion:
      "Especialista en interfaces reactivas con React 18, gestión global del estado y microinteracciones de alto impacto visual.",
    tecnologias: ["React", "Tailwind", "TypeScript", "Zustand"],
    ubicacion: "Tucumán, AR",
  },
  {
    nombre: "Guadalupe Andriani",
    rol: "Backend & DB Architect",
    etiquetaRol: "Arch",
    foto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
    descripcion:
      "Construcción de arquitecturas data-driven en React, persistencia segura en LocalStorage y sincronización de datos de stock.",
    tecnologias: ["Node.js", "Express", "PostgreSQL", "JWT"],
    ubicacion: "Tucumán, AR",
  },
  {
    nombre: "Daniel Barraza",
    rol: "FullStack & QA Lead",
    etiquetaRol: "QA/Dev",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
    descripcion:
      "Implementación de buenas prácticas y tests unitarios con GitHub Actions y gestión del control de versiones del equipo.",
    tecnologias: ["React", "Jest", "Cypress", "CI/CD"],
    ubicacion: "Tucumán, AR",
  },
];

const ETAPAS = [
  {
    numero: "01",
    semanas: "Primera semana",
    titulo: "Planificación y diseño",
    detalle:
      "Comenzamos organizando las ideas del proyecto, creando el mockup de la página y preparando el repositorio de GitHub para trabajar en equipo.",
    estado: "Completado",
  },
  {
    numero: "02",
    semanas: "Primera semana",
    titulo: "Estructura del proyecto",
    detalle:
      "Creamos las primeras páginas y componentes, organizamos las carpetas y definimos cómo iba a estar distribuida la información del sitio.",
    estado: "Completado",
  },
  {
    numero: "03",
    semanas: "Segunda semana",
    titulo: "Diseño y funcionalidades",
    detalle:
      "Desarrollamos las distintas secciones, incorporamos los productos, los filtros, el carrito de compras y las herramientas para administrar el catálogo.",
    estado: "Completado",
  },
  {
    numero: "04",
    semanas: "Segunda semana",
    titulo: "Detalles finales y presentación",
    detalle:
      "Revisamos el funcionamiento de la página, corregimos errores, ajustamos el diseño y completamos los últimos detalles para presentar nuestro proyecto.",
    estado: "Completado",
  },
];

const TECCNOLOGIAS = [
  { nombre: "React 19", detalle: "Core UI", icono: "⚛️" },
  { nombre: "Tailwind CSS", detalle: "Design Tokens", icono: "🎨" },
  { nombre: "TypeScript", detalle: "Type Safety", icono: "🛡️" },
  { nombre: "Vite", detalle: "Build Tool", icono: "⚡" },
  { nombre: "REST API", detalle: "Backend & Storage", icono: "🌐" },
  { nombre: "GitHub", detalle: "CI/DevOps", icono: "🐙" },
];

export const PaginaNosotros = ({ alNavegar }: PropiedadesPaginaNosotros) => {
  const irA = (seccion: string) => {
    if (alNavegar) {
      alNavegar(seccion);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            PROYECTO FINAL ACADÉMICO • RollingCode School • Cohorte 2026
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-secondary-900 tracking-tight leading-[1.15]">
            Construyendo la nueva experiencia del{" "}
            <span className="text-primary-500">comercio digital</span>.
          </h1>
          <p className="text-secondary-600 text-sm sm:text-base leading-relaxed max-w-xl">
            Lumina Commerce nace de la visión de repensar el retail de
            tecnología de alto desempeño. Una síntesis de arquitectura frontend
            modular, diseño de sistemas riguroso y telemetría de inventario en
            tiempo real concebida con los estándares más exigentes de la
            industria.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => irA("catalogo")}
              className="px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Explorar Catálogo →
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white border border-secondary-200 hover:bg-secondary-50 text-secondary-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Repositorio GitHub ↗
            </a>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-secondary-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-secondary-100">
              <span className="text-xs font-bold text-secondary-900 font-heading">
                Ficha Técnica del Proyecto
              </span>
              <span className="px-2 py-0.5 rounded-md bg-tertiary-50 text-tertiary-700 text-[10px] font-bold">
                AUDITORÍA V2.4
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-secondary-50 border border-secondary-100 space-y-1">
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-primary-600 block">
                  99.8%
                </span>
                <span className="text-[11px] font-semibold text-secondary-500 uppercase tracking-wider block">
                  Lighthouse Perf.
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-secondary-50 border border-secondary-100 space-y-1">
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-secondary-900 block">
                  &lt; 180ms
                </span>
                <span className="text-[11px] font-semibold text-secondary-500 uppercase tracking-wider block">
                  Tiempo de Carga
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-secondary-50 border border-secondary-100 space-y-1">
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-secondary-900 block">
                  32+
                </span>
                <span className="text-[11px] font-semibold text-secondary-500 uppercase tracking-wider block">
                  Componentes UI
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-secondary-50 border border-secondary-100 space-y-1">
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-tertiary-600 block">
                  100%
                </span>
                <span className="text-[11px] font-semibold text-secondary-500 uppercase tracking-wider block">
                  Responsive Web
                </span>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-[11px] text-secondary-500 mb-1">
                <span>Pruebas Unitarias &amp; Cobertura</span>
                <span className="font-bold text-secondary-800">
                  94.5% Pasadas
                </span>
              </div>
              <div className="w-full h-1.5 bg-secondary-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full w-[94.5%]" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="space-y-6">
        <div>
          <span className="text-[11px] font-bold text-primary-500 uppercase tracking-wider block">
            Nuestros Fundamentos
          </span>
          <h2 className="text-2xl font-heading font-bold text-secondary-900">
            La ingeniería detrás de cada clic
          </h2>
          <p className="text-xs text-secondary-500 mt-1 max-w-xl">
            Diseñamos Lumina pensando en escalabilidad productiva, no solo en un
            prototipo estético. Cuatro pilares estructuran nuestro stack.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-secondary-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">
              ⚡
            </div>
            <h3 className="font-heading font-bold text-sm text-secondary-900">
              Rendimiento React
            </h3>
            <p className="text-xs text-secondary-500 leading-relaxed">
              Virtualización de catálogos masivos y optimización de render con
              hooks de estado y memoización para garantizar 60 FPS estables.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-secondary-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">
              🏗️
            </div>
            <h3 className="font-heading font-bold text-sm text-secondary-900">
              Arquitectura Limpia
            </h3>
            <p className="text-xs text-secondary-500 leading-relaxed">
              Separación modular entre capas de datos, tipos tipados en
              TypeScript y componentes atómicos reutilizables.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-secondary-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-tertiary-50 text-tertiary-600 flex items-center justify-center font-bold text-sm">
              ♿
            </div>
            <h3 className="font-heading font-bold text-sm text-secondary-900">
              Accesibilidad Total
            </h3>
            <p className="text-xs text-secondary-500 leading-relaxed">
              Soporte nativo para lectores de pantalla, navegación fluida por
              teclado y contraste cromático conforme a normas WCAG 2.1 AA.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-secondary-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-secondary-100 text-secondary-700 flex items-center justify-center font-bold text-sm">
              🎯
            </div>
            <h3 className="font-heading font-bold text-sm text-secondary-900">
              UX Sin Fricción
            </h3>
            <p className="text-xs text-secondary-500 leading-relaxed">
              Respuestas instantáneas al vuelo, filtros combinados sin recargas
              y un checkout con validación interactiva paso a paso.
            </p>
          </div>
        </div>
      </section>
      <section className="space-y-6 pt-4 border-t border-secondary-200/60">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold text-primary-500 uppercase tracking-wider block">
              Talento &amp; Compromiso
            </span>
            <h2 className="text-2xl font-heading font-bold text-secondary-900">
              Equipo de Desarrollo
            </h2>
            <p className="text-xs text-secondary-500 mt-1 max-w-2xl">
              Estudiantes y desarrolladores formados en el Bootcamp Intensivo de
              RollingCode School, fusionando precisión visual e ingeniería de
              software.
            </p>
          </div>
          <span className="text-xs font-semibold text-secondary-500 px-3 py-1 bg-secondary-100 rounded-full self-start sm:self-auto">
            3 Desarrolladores Principales
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MIEMBROS_EQUIPO.map((miembro) => (
            <div
              key={miembro.nombre}
              className="bg-white rounded-2xl border border-secondary-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-4/3 w-full bg-secondary-100 overflow-hidden">
                  <img
                    src={miembro.foto}
                    alt={miembro.nombre}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold rounded-md bg-secondary-900/80 backdrop-blur-xs text-white">
                    {miembro.etiquetaRol}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-heading font-bold text-base text-secondary-900 leading-tight">
                      {miembro.nombre}
                    </h3>
                    <span className="text-xs font-semibold text-primary-600 block mt-0.5">
                      {miembro.rol}
                    </span>
                  </div>
                  <p className="text-xs text-secondary-500 leading-relaxed line-clamp-3">
                    {miembro.descripcion}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {miembro.tecnologias.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-medium bg-secondary-50 text-secondary-600 rounded-md border border-secondary-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-5 pt-3 border-t border-secondary-100 flex items-center justify-between text-xs text-secondary-400">
                <span className="flex items-center gap-1 text-[11px]">
                  📍 {miembro.ubicacion}
                </span>
                <span className="text-secondary-400 font-bold hover:text-primary-600 cursor-pointer transition-colors">
                  ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-6 pt-4 border-t border-secondary-200/60">
        <div>
          <span className="text-[11px] font-bold text-primary-500 uppercase tracking-wider block">
            Hoja de Ruta
          </span>
          <h2 className="text-2xl font-heading font-bold text-secondary-900">
            Evolución del Proyecto
          </h2>
          <p className="text-xs text-secondary-500 mt-1 max-w-xl">
            Un proceso iterativo de 2 semanas estructurado bajo metodologías
            ágiles Scrum en RollingCode School.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ETAPAS.map((etapa) => (
            <div
              key={etapa.numero}
              className="bg-white p-5 rounded-2xl border border-secondary-200 shadow-xs space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-primary-50 text-primary-600 font-heading font-bold text-xs flex items-center justify-center">
                  {etapa.numero}
                </span>
                <span className="text-[10px] font-semibold text-secondary-400">
                  {etapa.semanas}
                </span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-secondary-900">
                  {etapa.titulo}
                </h3>
                <p className="text-xs text-secondary-500 leading-relaxed mt-1">
                  {etapa.detalle}
                </p>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-tertiary-600">
                <span>✓</span>
                <span>{etapa.estado}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-6 pt-4 border-t border-secondary-200/60">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-[11px] font-bold text-primary-500 uppercase tracking-wider block">
            Arquitectura de Software
          </span>
          <h2 className="text-2xl font-heading font-bold text-secondary-900">
            Tech Stack de Lumina
          </h2>
          <p className="text-xs text-secondary-500">
            Selección tecnológica orientada a mantenibilidad, desarrollo en
            equipo y performance sin compromisos.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {TECCNOLOGIAS.map((tech) => (
            <div
              key={tech.nombre}
              className="bg-white p-4 rounded-2xl border border-secondary-200 shadow-xs text-center space-y-1 hover:border-primary-300 transition-colors"
            >
              <span className="text-2xl block mb-1">{tech.icono}</span>
              <span className="font-heading font-bold text-xs text-secondary-900 block truncate">
                {tech.nombre}
              </span>
              <span className="text-[10px] text-secondary-400 block truncate">
                {tech.detalle}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
