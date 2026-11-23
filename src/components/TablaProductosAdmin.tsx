import { useMemo, useState } from "react";
import { useProductos } from "../context/ProductosContext";
import type { Producto } from "../types/Producto";

interface PropiedadesTablaAdmin {
  alCrearNuevo: () => void;
  alEditarProducto: (producto: Producto) => void;
}

const CATEGORIA_FILTRO = [
  "Todas",
  "Computacion",
  "Audio",
  "Gaming",
  "Monitores",
  "Hogar",
  "Accesorios",
  "Tecnologia",
];

export const TablaProductosAdmin = ({
  alCrearNuevo,
  alEditarProducto,
}: PropiedadesTablaAdmin) => {
  const { productos, eliminarProducto } = useProductos();

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  const productosFiltrados = useMemo(() => {
    return productos.filter((prod) => {
      const coincideTexto =
        prod.nombre
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        prod.id.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase());

      const coincideCategoria =
        categoriaSeleccionada === "Todas" ||
        prod.categoria === categoriaSeleccionada;

      return coincideTexto && coincideCategoria;
    });
  }, [productos, busqueda, categoriaSeleccionada]);

  const confirmarYEliminar = (id: string, nombre: string) => {
    const seguro = window.confirm(
      `¿Estas seguro de que deseas eliminar "${nombre}" (${id} del inventario)`,
    );
    if (seguro) {
      eliminarProducto(id);
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-secondary-200 p-6 space-y-5 shadow-xs">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-heading font-bold text-secondary-900">
              Gestion de Productos
            </h2>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-secondary-100 text-secondary-700">
              {productosFiltrados.length} items
            </span>
          </div>
          <p>
            Control de existencias, catalogación SKU y disponibilidad directa en
            tienda.
          </p>
        </div>
        <button
          type="button"
          onClick={alCrearNuevo}
          className="px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <span>+</span>
          <span>Nuevo Producto</span>
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por ID o Nombre..."
            className="w-full pl-3 pr-8 py-2 text-xs bg-secondary-50 border border-secondary-200 rounded-xl text-secondary-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
          />
          {busqueda && (
            <button
              type="button"
              onClick={() => setBusqueda("")}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-xs text-secondary-400 hover:text-secondary-700 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
