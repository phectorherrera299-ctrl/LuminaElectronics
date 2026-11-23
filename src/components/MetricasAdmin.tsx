import { useMemo } from "react";
import type { Producto } from "../types/Producto";

interface PropiedadesMetricasAdmin {
  productos: Producto[];
  totalUsuarios?: number;
}

export const MetricasAdmin = ({
  productos,
  totalUsuarios = 1240,
}: PropiedadesMetricasAdmin) => {
  const valorTotalInventario = useMemo(() => {
    return productos.reduce((acumulado, prod) => {
      return acumulado + prod.precio * prod.stock;
    }, 0);
  }, [productos]);

  const productosBajoStock = useMemo(() => {
    return productos.filter((prod) => prod.stock <= 3).length;
  }, [productos]);

  return (
    <section className="space-y-4">
      <div>
        <span className="text-[11px] font-bold tracking-wider text-primary-500 uppercase block mb-1">
          Lumina Console • Centro de Control
        </span>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-secondary-900">
          Resumen del Sistema
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-secondary-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-secondary-500 uppercase tracking-wider block">
            Valor Inventario
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-bold text-secondary-900">
              $
              {valorTotalInventario.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </span>
            <span className="text-[11px] text-tertiary-600 font-bold">
              +12.4%
            </span>
          </div>
          <span className="text-[11px] text-secondary-400 block">
            USD en stock activo
          </span>
        </div>
      </div>
    </section>
  );
};
