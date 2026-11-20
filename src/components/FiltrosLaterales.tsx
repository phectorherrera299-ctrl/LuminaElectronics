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
    <aside className="w-full lg:w-64 bg-white rounded-2xl border border-secondary-200 p-5 space-y-6 h-fit">
      <div className="flex items-center justify-between pb-3 border-b border-secondary-100">
        <h2 className="font-heading font-bold text-secondary-900 text-base">
          Filtros
        </h2>
        <button
          type="button"
          onClick={alReiniciarFiltros}
          className="text-xs font-semibold text-primary-500 hover:text-primary-700 transition-colors cursor-pointer"
        >
          Reiniciar
        </button>
      </div>
      <div>
        <h3 className="text-xs font-bold text-secondary-900 uppercase tracking-wider mb-3">
          Marcas
        </h3>
        <div className="space-y-2">
          {marcasDisponibles.map((marca) => {
            const estaSeleccionada = marcasSeleccionadas.includes(marca);
            return (
              <label
                key={marca}
                className="flex items-center gap-2.5 text-xs text-secondary-700 hover:text-secondary-900 cursor-pointer select-none"
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
    </aside>
  );
};
