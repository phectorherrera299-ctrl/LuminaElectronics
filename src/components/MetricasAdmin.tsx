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
};
