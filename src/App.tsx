import { ProveedorProductos, useProductos } from "./context/ProductosContext";
import { GrillaProductos } from "./components/GrillaProductos";
import { useState, useMemo } from "react";
import { BuscadorCategorias } from "./components/BuscadorCategorias";

function VistaCatalogo() {
  const { productos } = useProductos();
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [criterioOrden, setCriterioOrden] = useState("populares");

  const productosFiltrados = useMemo(() => {
    return productos
      .filter((producto) => {
        const coincideBusqueda =
          producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          producto.descripcion.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCategoria =
          categoriaSeleccionada === "Todos" ||
          producto.categoria === categoriaSeleccionada;
        return coincideBusqueda && coincideCategoria;
      })
      .sort((a, b) => {
        if (criterioOrden === "menor-precio") {
          return a.precio - b.precio;
        }
        if (criterioOrden === "mayor-precio") {
          return b.precio - a.precio;
        }
        return (b.calificacion || 0) - (a.calificacion || 0);
      });
  }, [productos, busqueda, categoriaSeleccionada, criterioOrden]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-secondary-900">
          Catálogo de Productos
        </h1>
        <p className="text-secondary-500 text-sm mt-1">
          Explora nuestra selección de dispositivos y accesorios de última generación.
        </p>
      </header>
      <BuscadorCategorias
        busqueda={busqueda}
        alCambiarBusqueda={setBusqueda}
        categoriaSeleccionada={categoriaSeleccionada}
        alSeleccionarCategoria={setCategoriaSeleccionada}
        criterioOrden={criterioOrden}
        alCambiarOrden={setCriterioOrden}
      />

      <GrillaProductos productos={productos} />
    </main>
  );
}

function App() {
  return (
    <ProveedorProductos>
      <div className="min-h-screen bg-neutral-50">
        <VistaCatalogo />
      </div>
    </ProveedorProductos>
  )
}
export default App
