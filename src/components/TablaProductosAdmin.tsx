import { useMemo, useState } from "react";
import { useProductos } from "../context/ProductosContext";
import type { Producto } from "../types/Producto";

interface PropiedadesTablaAdmin {
  alCrearNuevo: () => void;
  alEditarProducto: (producto: Producto) => void;
}

const CATEGORIAS_FILTRO = [
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
        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          className="px-3 py-2 text-xs bg-secondary-50 border border-secondary-200 rounded-xl text-secondary-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all cursor-pointer"
        >
          {CATEGORIAS_FILTRO.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "Todas" ? "Todas las Categorías" : cat}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto border border-secondary-100 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-secondary-50 text-secondary-500 uppercase tracking-wider font-semibold border-b border-secondary-100">
            <tr>
              <th className="py-3 px-4">ID / SKU</th>
              <th className="py-3 px-4">Producto</th>
              <th className="py-3 px-4">Categoría</th>
              <th className="py-3 px-4">Precio Unitario</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-100 text-secondary-700">
            {productosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-secondary-400">
                  No se encontraron productos que coincidan con la búsqueda.
                </td>
              </tr>
            ) : (
              productosFiltrados.map((prod) => (
                <tr
                  key={prod.id}
                  className="hover:bg-secondary-50/60 transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-bold text-primary-600 text-[11px]">
                    {prod.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.imagen}
                        alt={prod.nombre}
                        className="w-10 h-10 rounded-lg object-cover bg-secondary-100 shrink-0 border border-secondary-100"
                      />
                      <div className="max-w-xs">
                        <span className="font-semibold text-secondary-900 block truncate">
                          {prod.nombre}
                        </span>
                        <span className="text-[10px] text-secondary-400 block truncate">
                          {prod.marca || "Lumina"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-secondary-100 text-secondary-700 text-[10px] font-semibold">
                      {prod.categoria}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-secondary-900 font-heading">
                    ${prod.precio.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    {prod.stock === 0 ? (
                      <span className="px-2 py-0.5 rounded-md bg-error/10 text-error text-[10px] font-semibold">
                        Agotado (0)
                      </span>
                    ) : prod.stock <= 3 ? (
                      <span className="px-2 py-0.5 rounded-md bg-warning/10 text-warning text-[10px] font-semibold">
                        Bajo ({prod.stock})
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-tertiary-50 text-tertiary-700 text-[10px] font-semibold">
                        {prod.stock} unids.
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => alEditarProducto(prod)}
                        title="Editar producto"
                        className="p-1.5 rounded-lg text-secondary-500 hover:text-primary-600 hover:bg-primary-50 transition-colors cursor-pointer"
                      >
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
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => confirmarYEliminar(prod.id, prod.nombre)}
                        title="Eliminar producto"
                        className="p-1.5 rounded-lg text-secondary-500 hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
                      >
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
