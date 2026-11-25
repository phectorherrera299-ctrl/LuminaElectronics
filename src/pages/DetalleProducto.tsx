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
  const { alternarDeseo, esDeseo } = useDeseos();
  const favorito = esDeseo(producto.id);

  const [cantidad, setCantidad] = useState(1);
  const [colorSeleccionado, setColorSeleccionado] = useState("Plata Platino");

  const fotosMiniatura = [
    producto.imagen,
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
  ];

  const [fotoActiva, setFotoActiva] = useState(fotosMiniatura[0]);

  const precioFinal = producto.descuento
    ? (producto.precio * (1 - producto.descuento / 100)).toFixed(2)
    : producto.precio.toFixed(2);

  const ahorro = producto.descuento
    ? (producto.precio * (producto.descuento / 100)).toFixed(2)
    : null;

  const cuota = (parseFloat(precioFinal) / 12).toFixed(2);

  const incrementarCantidad = () => {
    if (cantidad < producto.stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const manejarCarrito = () => {
    if (alAgregarAlCarrito) {
      alAgregarAlCarrito(producto, cantidad);
    }
    alert(
      `¡Agregaste ${cantidad} unidad(es) de ${producto.nombre} al carrito!`,
    );
  };
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
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0">
            {fotosMiniatura.map((foto, index) => (
              <button
                key={foto + index}
                type="button"
                onClick={() => setFotoActiva(foto)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-white ${
                  fotoActiva === foto
                    ? "border-primary-500 ring-2 ring-primary-100 shadow-sm"
                    : "border-secondary-200 hover:border-secondary-300 opacity-80 hover:opacity-100"
                }`}
              >
                <img
                  src={foto}
                  alt={`Vista ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4"></div>
        {/* Información y compra */}
        <div className="lg:col-span-5 space-y-6"></div>
      </section>
    </main>
  );
};
