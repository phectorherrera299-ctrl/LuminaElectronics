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

          <div className="relative flex-1 aspect-square rounded-3xl bg-white border border-secondary-200 overflow-hidden shadow-xs flex items-center justify-center p-6">
            <img
              src={fotoActiva}
              alt={producto.nombre}
              className="max-h-full max-w-full object-contain transition-all duration-300"
            />

            <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
              <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-primary-500 text-white shadow-xs">
                Lumina Flagship
              </span>
              {producto.descuento && (
                <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-error text-white shadow-xs">
                  -{producto.descuento}% OFF
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => alternarDeseo(producto.id)}
              aria-label="Agregar a lista de deseos"
              className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs border border-secondary-200 flex items-center justify-center shadow-xs transition-all cursor-pointer ${
                favorito
                  ? "text-error scale-110"
                  : "text-secondary-400 hover:text-error"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={favorito ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-5 h-5 transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                {producto.marca || "Lumina Hardware"}
              </span>
              <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-1 rounded-md">
                ⚡ Envío Prioritario 24h
              </span>
            </div>
            <h1 className="text-3xl font-heading font-bold text-secondary-900 leading-tight">
              {producto.nombre}
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex text-warning">
                {"★★★★★".slice(0, Math.round(producto.calificacion || 5))}
              </div>
              <span className="font-bold text-secondary-900">
                {(producto.calificacion || 4.9).toFixed(1)}
              </span>
              <span className="text-secondary-400">
                (342 valoraciones verificadas)
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
