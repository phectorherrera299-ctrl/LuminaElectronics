import { useState, useEffect } from "react";
import type { Producto } from "../types/Producto";
import { useProductos } from "../context/ProductosContext";

interface ModalProductoProps {
  abierto: boolean;
  alCerrar: () => void;
  productoAEditar?: Producto | null;
}

const CATEGORIAS_VALIDAS = [
  "Smartphones",
  "Laptops",
  "Audio",
  "Wearables",
  "Accesorios",
  "Fotografía",
];

export function ModalProducto({
  abierto,
  alCerrar,
  productoAEditar,
}: ModalProductoProps) {
  const { productos, agregarProducto, editarProducto } = useProductos();

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState<number | "">("");
  const [categoria, setCategoria] = useState(CATEGORIAS_VALIDAS[0]);
  const [marca, setMarca] = useState("");
  const [stock, setStock] = useState<number | "">(0);
  const [descuento, setDescuento] = useState<number | "">(0);
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [errorValidacion, setErrorValidacion] = useState<string | null>(null);

  const esModoEdicion = Boolean(productoAEditar);

  useEffect(() => {
    if (productoAEditar) {
      setNombre(productoAEditar.nombre || "");
      setPrecio(productoAEditar.precio ?? "");
      setCategoria(productoAEditar.categoria || CATEGORIAS_VALIDAS[0]);
      setMarca(productoAEditar.marca || "");
      setStock(productoAEditar.stock ?? 0);
      setDescuento(productoAEditar.descuento ?? 0);
      setImagen(productoAEditar.imagen || "");
      setDescripcion(productoAEditar.descripcion || "");
    } else {
      setNombre("");
      setPrecio("");
      setCategoria(CATEGORIAS_VALIDAS[0]);
      setMarca("");
      setStock(1);
      setDescuento(0);
      setImagen("");
      setDescripcion("");
    }
    setErrorValidacion(null);
  }, [productoAEditar, abierto]);

  useEffect(() => {
    const manejarTeclaEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && abierto) alCerrar();
    };
    window.addEventListener("keydown", manejarTeclaEscape);
    return () => window.removeEventListener("keydown", manejarTeclaEscape);
  }, [abierto, alCerrar]);

  if (!abierto) return null;

  const generarIdUnico = (): string => {
    let nuevoId = "";
    let existe = true;
    while (existe) {
      const random = Math.floor(1000 + Math.random() * 9000);
      nuevoId = `PRD-${random}`;
      existe = productos.some((p) => p.id === nuevoId);
    }
    return nuevoId;
  };

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorValidacion(null);

    if (!nombre.trim()) {
      setErrorValidacion("El nombre del producto es obligatorio.");
      return;
    }
    if (precio === "" || Number(precio) <= 0) {
      setErrorValidacion("El precio debe ser un número mayor a 0.");
      return;
    }
    if (stock === "" || Number(stock) < 0) {
      setErrorValidacion("El stock no puede ser un número negativo.");
      return;
    }
    if (
      descuento !== "" &&
      (Number(descuento) < 0 || Number(descuento) > 100)
    ) {
      setErrorValidacion("El descuento debe estar entre 0% y 100%.");
      return;
    }
    if (!descripcion.trim()) {
      setErrorValidacion("La descripción es obligatoria.");
      return;
    }

    const imagenFinal =
      imagen.trim() ||
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";

    if (esModoEdicion && productoAEditar) {
      const productoActualizado: Producto = {
        ...productoAEditar,
        nombre: nombre.trim(),
        precio: Number(precio),
        categoria,
        marca: marca.trim() || "Genérica",
        stock: Number(stock),
        descuento: Number(descuento) || 0,
        imagen: imagenFinal,
        descripcion: descripcion.trim(),
      };
      editarProducto(productoAEditar.id, productoActualizado);
    } else {
      const nuevoProducto: Producto = {
        id: generarIdUnico(),
        nombre: nombre.trim(),
        precio: Number(precio),
        categoria,
        marca: marca.trim() || "Genérica",
        stock: Number(stock),
        descuento: Number(descuento) || 0,
        imagen: imagenFinal,
        descripcion: descripcion.trim(),
        calificacion: 5,
        destacado: false,
      };
      agregarProducto(nuevoProducto);
    }

    alCerrar();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-900/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) alCerrar();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-secondary-200">
        <div className="flex items-center justify-between p-6 border-b border-secondary-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-heading font-bold text-secondary-900">
              {esModoEdicion ? "Editar Producto" : "Crear Nuevo Producto"}
            </h2>
            <p className="text-xs text-secondary-500 mt-0.5">
              {esModoEdicion
                ? `Editando SKU: ${productoAEditar?.id}`
                : "Completa los campos para publicar un nuevo artículo"}
            </p>
          </div>
          <button
            type="button"
            onClick={alCerrar}
            className="w-8 h-8 rounded-full flex items-center justify-center text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
