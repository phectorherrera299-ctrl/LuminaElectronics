import type { Producto } from "../types/Producto"

interface PropiedadesTarjeta {
  producto: Producto
}

export const TarjetaProducto = ({ producto }: PropiedadesTarjeta) => {
  const precioFinal = producto.descuento
    ? (producto.precio * (1 - producto.descuento / 100)).toFixed(2)
    : producto.precio.toFixed(2)

  const estadoStock = () => {
    if (producto.stock === 0) {
      return { texto: 'Agotado', clase: 'bg-error/10 text-error border-error/20' }
    }
    if (producto.stock <= 3) {
      return { texto: `Bajo Stock (${producto.stock})`, clase: 'bg-warning/10 text-warning border-warning/20' }
    }
    return { texto: 'En Stock', clase: 'bg-tertiary-50 text-tertiary-700 border-tertiary-200' }
  }

  const stockInfo = estadoStock()

  return (
    <article className="group bg-white rounded-2xl border border-secondary-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative aspect-square w-full bg-secondary-50 overflow-hidden">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            {producto.descuento && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-error text-white shadow-xs">
                -{producto.descuento}%
              </span>
            )}
            <span className={`px-2 py-0.5 text-xs font-medium rounded-md border ${stockInfo.clase}`}>
              {stockInfo.texto}
            </span>
          </div>

          <button
            type="button"
            aria-label="Agregar a lista de deseos"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-secondary-500 hover:text-error hover:bg-white shadow-xs transition-colors cursor-pointer"
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-secondary-500">
            <span className="font-medium uppercase tracking-wider text-secondary-400">
              {producto.categoria}
            </span>
            {producto.calificacion && (
              <span className="flex items-center gap-1 font-semibold text-secondary-700">
                <span className="text-warning">★</span>
                {producto.calificacion.toFixed(1)}
              </span>
            )}
          </div>

          <h3 className="font-heading font-semibold text-secondary-900 text-sm leading-snug line-clamp-2">
            {producto.nombre}
          </h3>

          <p className="text-xs text-secondary-500 line-clamp-2">
            {producto.descripcion}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0 border-t border-secondary-100 mt-2 flex items-center justify-between gap-2">
        <div>
          {producto.descuento ? (
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-secondary-900 font-heading">
                ${precioFinal}
              </span>
              <span className="text-xs text-secondary-400 line-through">
                ${producto.precio.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-secondary-900 font-heading">
              ${precioFinal}
            </span>
          )}
          <span className="block text-[10px] text-secondary-400 uppercase font-medium">USD</span>
        </div>

        <button
          type="button"
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-500 hover:text-white transition-colors cursor-pointer"
        >
          Ver Detalle
        </button>
      </div>
    </article>
  )
}