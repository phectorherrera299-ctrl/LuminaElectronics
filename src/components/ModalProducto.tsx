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
        <form onSubmit={manejarEnvio} className="p-6 space-y-4">
          {errorValidacion && (
            <div className="p-3 bg-error/10 border border-error/20 text-error text-xs rounded-xl font-medium">
              ⚠️ {errorValidacion}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-secondary-700">
                Nombre del Producto *
              </label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Auriculares Noise Cancelling Pro"
                className="w-full px-3 py-2 text-sm border border-secondary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-secondary-700">
                Categoría *
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-secondary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white"
              >
                {CATEGORIAS_VALIDAS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-secondary-700">
                Marca
              </label>
              <input
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                placeholder="Ej. Sony, Apple, Samsung..."
                className="w-full px-3 py-2 text-sm border border-secondary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-secondary-700">
                Precio (USD) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                value={precio}
                onChange={(e) =>
                  setPrecio(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="299.99"
                className="w-full px-3 py-2 text-sm border border-secondary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-secondary-700">
                Descuento (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={descuento}
                onChange={(e) =>
                  setDescuento(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                placeholder="0"
                className="w-full px-3 py-2 text-sm border border-secondary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-secondary-700">
                Stock disponible *
              </label>
              <input
                type="number"
                min="0"
                required
                value={stock}
                onChange={(e) =>
                  setStock(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="10"
                className="w-full px-3 py-2 text-sm border border-secondary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-secondary-700">
                URL de Imagen
              </label>
              <input
                type="url"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 text-sm border border-secondary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-secondary-700">
                Descripción *
              </label>
              <textarea
                rows={3}
                required
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Características principales del producto..."
                className="w-full px-3 py-2 text-sm border border-secondary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
