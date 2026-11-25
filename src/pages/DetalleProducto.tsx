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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fade-in">
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
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 font-heading">
                {producto.marca || "Lumina Hardware"}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-50 text-tertiary-700 text-[11px] font-semibold border border-tertiary-200">
                <span>⚡</span> Envío Prioritario 24h
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-secondary-900 leading-tight">
              {producto.nombre}
            </h1>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center text-advertencia text-sm">
                {"★★★★★".slice(0, Math.round(producto.calificacion || 5))}
              </div>
              <span className="text-xs font-bold text-secondary-900">
                {(producto.calificacion || 4.9).toFixed(1)}
              </span>
              <span className="text-xs text-secondary-400">•</span>
              <span className="text-xs text-secondary-500 underline cursor-pointer">
                342 valoraciones verificadas
              </span>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-secondary-200 shadow-xs space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-heading font-extrabold text-secondary-900">
                ${precioFinal}
              </span>
              {producto.descuento && (
                <>
                  <span className="text-base text-secondary-400 line-through">
                    ${producto.precio.toFixed(2)}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-error/10 text-error text-xs font-bold">
                    Ahorras ${ahorro} ({producto.descuento}%)
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-secondary-500">
              💳 O hasta 12 cuotas fijas sin interés de{" "}
              <strong className="text-secondary-800">${cuota} USD</strong>
            </p>
            <div className="pt-3 border-t border-secondary-100 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-tertiary-700">
                <span className="w-2 h-2 rounded-full bg-tertiary-500 animate-pulse" />
                Stock Inmediato
              </span>
              <span className="text-secondary-500 font-medium">
                {producto.stock} unidades en bodega
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-secondary-900 uppercase tracking-wider block">
              Acabado Premium:{" "}
              <span className="text-secondary-600 font-normal">
                {colorSeleccionado}
              </span>
            </span>
            <div className="flex gap-2">
              {["Plata Platino", "Negro Mate", "Azul Medianoche"].map(
                (color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setColorSeleccionado(color)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      colorSeleccionado === color
                        ? "border-primary-500 bg-primary-50 text-primary-700 shadow-xs"
                        : "border-secondary-200 bg-white text-secondary-700 hover:bg-secondary-50"
                    }`}
                  >
                    {color}
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-secondary-200 rounded-xl bg-white shadow-xs p-1">
                <button
                  type="button"
                  onClick={decrementarCantidad}
                  disabled={cantidad <= 1}
                  className="w-9 h-9 flex items-center justify-center text-secondary-600 hover:text-secondary-900 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-base cursor-pointer"
                >
                  −
                </button>
                <span className="w-10 text-center font-heading font-bold text-secondary-900 text-sm">
                  {cantidad}
                </span>
                <button
                  type="button"
                  onClick={incrementarCantidad}
                  disabled={cantidad >= producto.stock}
                  className="w-9 h-9 flex items-center justify-center text-secondary-600 hover:text-secondary-900 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-base cursor-pointer"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-secondary-500">
                Máximo permitido: <strong>{producto.stock} unids.</strong>
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={manejarCarrito}
                className="py-3 px-6 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🛒</span>
                <span>Añadir al Carrito</span>
              </button>
              <button
                type="button"
                onClick={manejarCarrito}
                className="py-3 px-6 rounded-xl bg-secondary-900 hover:bg-secondary-800 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>⚡</span>
                <span>Comprar Ahora</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-secondary-200 text-xs text-secondary-500">
            <div className="flex items-center gap-2">
              <span className="text-base">🛡️</span>
              <div>
                <span className="font-bold text-secondary-800 block">
                  Garantía 2 Años
                </span>
                <span className="text-[11px]">Soporte oficial directo</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base">🔄</span>
              <div>
                <span className="font-bold text-secondary-800 block">
                  Devolución 30 Días
                </span>
                <span className="text-[11px]">Reembolso sin preguntas</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-secondary-200 shadow-xs space-y-2">
          <span className="text-2xl block">🎧</span>
          <h3 className="font-heading font-bold text-sm text-secondary-900">
            Auto NC Optimizer
          </h3>
          <p className="text-xs text-secondary-500 leading-relaxed">
            Calibración de presión atmosférica constante y 8 micrófonos que aíslan las frecuencias vocales y agudas.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-secondary-200 shadow-xs space-y-2">
          <span className="text-2xl block">🔋</span>
          <h3 className="font-heading font-bold text-sm text-secondary-900">
            Autonomía de 30h
          </h3>
          <p className="text-xs text-secondary-500 leading-relaxed">
            Batería masiva para viajes largos. Carga ultrarrápida USB-PD: 3 minutos otorgan 3 horas completas de uso.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-secondary-200 shadow-xs space-y-2">
          <span className="text-2xl block">🔊</span>
          <h3 className="font-heading font-bold text-sm text-secondary-900">
            Diafragma 30mm en Carbono
          </h3>
          <p className="text-xs text-secondary-500 leading-relaxed">
            Cúpula de fibra de carbono ultra-rígida para una claridad acústica superior y graves profundos sin distorsión.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-secondary-200 shadow-xs space-y-2">
          <span className="text-2xl block">📱</span>
          <h3 className="font-heading font-bold text-sm text-secondary-900">
            Conexión Multipunto
          </h3>
          <p className="text-xs text-secondary-500 leading-relaxed">
            Emparejamiento simultáneo con dos dispositivos Bluetooth®. Pasa del portátil al smartphone con total fluidez.
          </p>
        </div>
      </section>
    </main>
  );
};