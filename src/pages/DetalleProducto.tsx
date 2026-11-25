
import { useState } from "react";
import type { Producto } from "../types/Producto";
import { useDeseos } from "../context/ContextoDeseos";

interface PropiedadesDetalle {
  producto: Producto;
  alVolver: () => void;
  alAgregarAlCarrito?: (producto: Producto, cantidad: number) => void;
}

export const DetalleProducto = ({
  producto,
  alVolver,
  alAgregarAlCarrito,
}: PropiedadesDetalle) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <nav className="flex items-center gap-2 text-xs text-secondary-500 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={alVolver}
          className="hover:text-primary-600 transition-colors cursor-pointer flex items-center gap-1 font-semibold"
        >
          ← Volver al Catálogo
        </button>
        <span>/</span>
        <span>{producto.categoria}</span>
        <span>/</span>
        <span className="text-secondary-900 font-semibold truncate max-w-xs">
          {producto.nombre}
        </span>
      </nav>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Galería de imágenes */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
        </div>

        {/* Información y compra */}
        <div className="lg:col-span-5 space-y-6">
        </div>
      </section>
    </main>
  );
};
