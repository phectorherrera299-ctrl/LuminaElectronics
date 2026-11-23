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
};
