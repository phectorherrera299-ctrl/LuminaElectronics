import { useState } from "react";
import type { Producto } from "../types/Producto";
import { TarjetaProducto } from "./TarjetaProducto";

interface PropiedadesGrilla {
  productos: Producto[];
}

const PRODUCTOS_POR_PAGINA = 8;

export const GrillaProductos = ({ productos }: PropiedadesGrilla) => {
  const [paginaActual, setPaginaActual] = useState(1);

  const totalPaginas = Math.ceil(productos.length / PRODUCTOS_POR_PAGINA);
  const indiceInicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
  const productosVisibles = productos.slice(
    indiceInicio,
    indiceInicio + PRODUCTOS_POR_PAGINA,
  );

  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
      window.scroll({ top: 400, behavior: "smooth" });
    }
  };

  if (productos.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-secondary-200 p-8">
        <p className="text-secondary-400 text-base">
          No se encontraron productos disponibles con estos filtros.
        </p>
      </div>
    );
  }
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between text-xs text-secondary-500">
        <span>
          Mostrando{" "}
          <strong className="text-secondary-900">
            {productosVisibles.length}
          </strong>{" "}
          de <strong className="text-secondary-900">{productos.length}</strong>{" "}
          productos
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productosVisibles.map((producto) => (
          <TarjetaProducto key={producto.id} producto={producto} />
        ))}
      </div>
      {totalPaginas > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6 border-t border-secondary-200">
          <button
            type="button"
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-secondary-200 text-secondary-700 hover:bg-secondary-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Anterior
          </button>
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
            (numeroPagina) => (
              <button
                key={numeroPagina}
                type="button"
                onClick={() => cambiarPagina(numeroPagina)}
                className={`w-8 h-8 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  paginaActual === numeroPagina
                    ? "bg-primary-500 text-white"
                    : "text-secondary-700 hover:bg-secondary-100"
                }`}
              >
                {numeroPagina}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-secondary-200 text-secondary-700 hover:bg-secondary-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
};
