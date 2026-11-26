interface PropiedadesFiltrosLaterales {
  marcasDisponibles: string[];
  marcasSeleccionadas: string[];
  alCambiarMarca: (marca: string) => void;
  precioMaximo: number;
  precioLimite: number;
  alCambiarPrecioMaximo: (precio: number) => void;
  soloEnStock: boolean;
  alCambiarSoloEnStock: (valor: boolean) => void;
  soloConDescuento: boolean;
  alCambiarSoloConDescuento: (valor: boolean) => void;
  calificacionMinima: number;
  alCambiarCalificacionMinima: (calificacion: number) => void;
  alReiniciarFiltros: () => void;
}

export const FiltrosLaterales = ({
  marcasDisponibles,
  marcasSeleccionadas,
  alCambiarMarca,
  precioMaximo,
  precioLimite,
  alCambiarPrecioMaximo,
  soloEnStock,
  alCambiarSoloEnStock,
  soloConDescuento,
  alCambiarSoloConDescuento,
  calificacionMinima,
  alCambiarCalificacionMinima,
  alReiniciarFiltros,
}: PropiedadesFiltrosLaterales) => {
  return (
    <aside className="w-full lg:w-64 bg-indigo-900 rounded-2xl border border-secondary-200 p-5 space-y-6 h-fit">
      <div className="flex items-center justify-between pb-3 border-b border-secondary-300">
        <h2 className="font-heading font-bold text-white text-base">
          Filtros
        </h2>
        <button
          type="button"
          onClick={alReiniciarFiltros}
          className="text-xs font-semibold text-primary-200 hover:text-primary-300 transition-colors cursor-pointer"
        >
          Reiniciar
        </button>
      </div>
      <div>
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
          Marcas Disponibles
        </h3>
        <div className="space-y-2">
          {marcasDisponibles.map((marca) => {
            const estaSeleccionada = marcasSeleccionadas.includes(marca);
            return (
              <label
                key={marca}
                className="flex items-center gap-2.5 text-xs text-white hover:text-secondary-300 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={estaSeleccionada}
                  onChange={() => alCambiarMarca(marca)}
                  className="w-4 h-4 rounded border-secondary-300 text-primary-500 focus:ring-primary-200 cursor-pointer"
                />
                <span>{marca}</span>
              </label>
            );
          })}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Precio Máximo
          </h3>
          <span className="text-xs font-bold text-primary-200 font-heading">
            ${precioMaximo.toLocaleString()} USD
          </span>
        </div>
        <input
          type="range"
          min={50}
          max={precioLimite}
          step={50}
          value={precioMaximo}
          onChange={(e) => alCambiarPrecioMaximo(Number(e.target.value))}
          className="w-full accent-primary-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-secondary-300 mt-1">
          <span>$50</span>
          <span>${precioLimite.toLocaleString()}</span>
        </div>
      </div>
      <div>
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
          Disponibilidad
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 text-xs text-white hover:text-secondary-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={soloEnStock}
              onChange={(e) => alCambiarSoloEnStock(e.target.checked)}
              className="w-4 h-4 rounded border-secondary-300 text-primary-500 focus:ring-primary-200 cursor-pointer"
            />
            <span>Solo productos en stock</span>
          </label>
          <label className="flex items-center gap-2.5 text-xs text-white hover:text-secondary-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={soloConDescuento}
              onChange={(e) => alCambiarSoloConDescuento(e.target.checked)}
              className="w-4 h-4 rounded border-secondary-300 text-primary-500 focus:ring-primary-200 cursor-pointer"
            />
            <span>Solo con descuento activo</span>
          </label>
        </div>
      </div>
      <div>
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
          Calificación Mínima
        </h3>
        <div className="flex gap-2">
          {[4.5, 4.0].map((calif) => {
            const activo = calificacionMinima === calif;
            return (
              <button
                key={calif}
                type="button"
                onClick={() => alCambiarCalificacionMinima(activo ? 0 : calif)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                  activo
                    ? "bg-primary-50 border-primary-500 text-primary-600"
                    : "border-secondary-200 text-white hover:bg-secondary-50"
                }`}
              >
                ★ {calif}+
              </button>
            );
          })}
        </div>
      </div>
      <div className="p-4 rounded-xl bg-primary-50/60 border border-primary-100 text-xs space-y-1">
        <span className="font-bold text-primary-900 block">Lumina Care</span>
        <p className="text-secondary-600 text-[11px] leading-relaxed">
          Garantía extendida de hasta 3 años con cobertura accidental directa.
        </p>
      </div>
    </aside>
  );
};
