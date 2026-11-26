interface PropiedadesBuscadorCategorias {
  busqueda: string;
  alCambiarBusqueda: (texto: string) => void;
  categoriaSeleccionada: string;
  alSeleccionarCategoria: (categoria: string) => void;
  criterioOrden: string;
  alCambiarOrden: (criterio: string) => void;
}

const CATEGORIAS = [
  "Todos",
  "Computacion",
  "Audio",
  "Gaming",
  "Monitores",
  "Hogar",
  "Accesorios",
];

export const BuscadorCategorias = ({
  busqueda,
  alCambiarBusqueda,
  categoriaSeleccionada,
  alSeleccionarCategoria,
  criterioOrden,
  alCambiarOrden,
}: PropiedadesBuscadorCategorias) => {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-secondary-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </span>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => alCambiarBusqueda(e.target.value)}
            placeholder="Buscar por nombre, modelo (ej. 'Sony XM5', 'MacBook', 'Keychron')..."
            className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-white border border-secondary-200 rounded-xl text-secondary-900 placeholder:text-secondary-400 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/15 shadow-xs transition-all"
          />
          {busqueda && (
            <button
              type="button"
              onClick={() => alCambiarBusqueda("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-secondary-400 hover:text-secondary-700 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label
            htmlFor="ordenar-por"
            className="text-xs text-secondary-500 whitespace-nowrap"
          >
            Ordenar:
          </label>
          <select
            id="ordenar-por"
            value={criterioOrden}
            onChange={(e) => alCambiarOrden(e.target.value)}
            className="bg-white border border-secondary-200 text-secondary-800 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary-500 cursor-pointer"
          >
            <option value="populares">Más Populares</option>
            <option value="menor-precio">Menor Precio</option>
            <option value="mayor-precio">Mayor Precio</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIAS.map((cat) => {
          const estaActivo = categoriaSeleccionada === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => alSeleccionarCategoria(cat)}
              className={`px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                estaActivo
                  ? "bg-gradient-to-r from-primary-600 to-indigo-600 text-white shadow-md shadow-primary-500/25 scale-105"
                  : "bg-white/80 backdrop-blur-sm border border-secondary-200 text-secondary-600 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/50"
              }`}
            >
              {cat === "Todos" ? "Todos los Equipos" : cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
