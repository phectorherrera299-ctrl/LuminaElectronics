import { useState } from "react";
import type { Producto } from "../types/Producto";
import { set } from "react-hook-form";

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
};
