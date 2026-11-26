import type { Producto } from "../types/Producto";
import { useDeseos } from "../context/ContextoDeseos";

interface PropiedadesTarjeta {
  producto: Producto;
  alVerDetalle?: (producto: Producto) => void;
}

export const TarjetaProducto = ({
  producto,
  alVerDetalle,
}: PropiedadesTarjeta) => {
  const precioFinal = producto.descuento
    ? (producto.precio * (1 - producto.descuento / 100)).toFixed(2)
    : producto.precio.toFixed(2);

  const estadoStock = () => {
    if (producto.stock === 0) {
      return {
        texto: "Agotado",
        clase: "bg-error/10 text-error border-error/20",
      };
    }
    if (producto.stock <= 3) {
      return {
        texto: `Bajo Stock (${producto.stock})`,
        clase: "bg-warning/10 text-warning border-warning/20",
      };
    }
    return {
      texto: "En Stock",
      clase: "bg-tertiary-50 text-tertiary-700 border-tertiary-200",
    };
  };

  const { alternarDeseo, esDeseo } = useDeseos();
  const marcadoFavorito = esDeseo(producto.id);
  const stockInfo = estadoStock();

  return (
    <article className="group bg-white rounded-3xl border-2 border-indigo-100/70 hover:border-primary-500 overflow-hidden shadow-xs hover:shadow-2xl hover:shadow-primary-500/15 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 relative">
      <div>
        <div className="relative aspect-square w-full bg-gradient-to-b from-indigo-50/50 via-purple-50/20 to-white overflow-hidden p-3 flex items-center justify-center">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-contain object-center group-hover:scale-108 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            {producto.descuento && (
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-xs">
                -{producto.descuento}%
              </span>
            )}
            <span
              className={`px-2 py-0.5 text-[11px] font-semibold rounded-lg border backdrop-blur-xs ${stockInfo.clase}`}
            >
              {stockInfo.texto}
            </span>
          </div>
          <button
            type="button"
            onClick={() => alternarDeseo(producto.id)}
            aria-label="Agregar a lista de deseos"
            className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-indigo-100 flex items-center justify-center shadow-xs transition-all cursor-pointer ${
              marcadoFavorito
                ? "text-error scale-110 shadow-md"
                : "text-secondary-400 hover:text-error hover:bg-white hover:scale-110"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={marcadoFavorito ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-4 h-4 transition-colors"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>
        <div className="p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="px-2 py-0.5 rounded-md bg-primary-50 text-primary-700 font-bold text-[10px] tracking-wider uppercase">
              {producto.categoria}
            </span>
            {producto.calificacion && (
              <span className="flex items-center gap-1 font-bold text-secondary-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 text-[11px]">
                <span className="text-amber-500">★</span>
                {producto.calificacion.toFixed(1)}
              </span>
            )}
          </div>
          <h3 className="font-heading font-bold text-secondary-900 text-sm leading-snug line-clamp-2 group-hover:text-primary-600 transition-colors">
            {producto.nombre}
          </h3>
          <p className="text-xs text-secondary-500 line-clamp-2 leading-relaxed">
            {producto.descripcion}
          </p>
        </div>
      </div>
      <div className="p-4 pt-3 border-t border-indigo-50/80 mt-1 flex items-center justify-between gap-2 bg-gradient-to-b from-transparent to-indigo-50/30">
        <div>
          {producto.descuento ? (
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-secondary-900 font-heading">
                ${precioFinal}
              </span>
              <span className="text-xs text-secondary-400 line-through font-medium">
                ${producto.precio.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-extrabold text-secondary-900 font-heading">
              ${precioFinal}
            </span>
          )}
          <span className="block text-[10px] text-primary-500 font-bold tracking-wider">
            USD
          </span>
        </div>
        <button
          type="button"
          onClick={() => alVerDetalle && alVerDetalle(producto)}
          className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600 text-white shadow-sm shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/35 hover:scale-105 transition-all cursor-pointer"
        >
          Ver Detalle
        </button>
      </div>
    </article>
  );
};
