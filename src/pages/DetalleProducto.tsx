import { useState, useEffect } from "react";
import type { Producto } from "../types/Producto";
import { useDeseos } from "../context/ContextoDeseos";
import { useCarrito } from "../context/ContextoCarrito";

interface AccesorioRecomendado {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
  etiqueta: string;
}

const ACCESORIOS_DEFECTO: AccesorioRecomendado[] = [
  {
    id: "ACC-01",
    nombre: "Estuche Rígido Reforzado ArmorCase",
    categoria: "Protección & Viajes",
    precio: 39.0,
    imagen:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80",
    etiqueta: "Accesorio Oficial",
  },
  {
    id: "ACC-02",
    nombre: "Cable DAC USB-C a 3.5mm Hi-Res Audio",
    categoria: "Cables & Conversión",
    precio: 29.5,
    imagen:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    etiqueta: "Audífilo",
  },
  {
    id: "ACC-03",
    nombre: "Soporte de Escritorio en Aluminio CNC",
    categoria: "Soportes & Estaciones",
    precio: 49.0,
    imagen:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80",
    etiqueta: "Diseño Minimalista",
  },
];

interface PropiedadesDetalle {
  producto: Producto;
  alVolver: () => void;
  alAgregarAlCarrito?: (producto: Producto, cantidad: number) => void;
  productosRecomendados?: Producto[];
}

type PestanaActiva = "descripcion" | "especificaciones" | "opiniones";

export const DetalleProducto = ({
  producto,
  alVolver,
  alAgregarAlCarrito,
  productosRecomendados = [],
}: PropiedadesDetalle) => {
  const { alternarDeseo, esDeseo } = useDeseos();
  const { agregarAlCarrito } = useCarrito();
  const favorito = esDeseo(producto.id);

  const [cantidad, setCantidad] = useState(1);
  const [colorSeleccionado, setColorSeleccionado] = useState("Plata Platino");
  const [pestana, setPestana] = useState<PestanaActiva>("descripcion");

  const obtenerMiniaturasPorProducto = (
    nombre: string,
    cat: string,
    imgPrincipal: string,
  ) => {
    const texto = `${nombre} ${cat}`.toLowerCase();

    if (
      texto.includes("echo") ||
      texto.includes("speaker") ||
      texto.includes("parlante") ||
      texto.includes("altavoz") ||
      texto.includes("alexa") ||
      texto.includes("homepod")
    ) {
      return [
        imgPrincipal,
        "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80",
        "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&q=80",
        "https://images.unsplash.com/photo-1507646227500-4d389b0012be?w=800&q=80",
      ];
    }

    if (
      texto.includes("phone") ||
      texto.includes("celular") ||
      texto.includes("iphone") ||
      texto.includes("galaxy") ||
      texto.includes("pixel") ||
      texto.includes("smartphone")
    ) {
      return [
        imgPrincipal,
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80",
      ];
    }

    if (
      texto.includes("tablet") ||
      texto.includes("ipad") ||
      texto.includes("kindle") ||
      texto.includes("paperwhite")
    ) {
      return [
        imgPrincipal,
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
        "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80",
        "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&q=80",
      ];
    }

    if (
      texto.includes("watch") ||
      texto.includes("reloj") ||
      texto.includes("band") ||
      texto.includes("wearable")
    ) {
      return [
        imgPrincipal,
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80",
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80",
      ];
    }

    if (texto.includes("mouse") || texto.includes("raton")) {
      return [
        imgPrincipal,
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80",
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
        "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=800&q=80",
      ];
    }

    if (
      texto.includes("teclado") ||
      texto.includes("keyboard") ||
      texto.includes("keychron")
    ) {
      return [
        imgPrincipal,
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80",
        "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80",
      ];
    }

    if (
      texto.includes("macbook") ||
      texto.includes("laptop") ||
      texto.includes("notebook") ||
      texto.includes("computación")
    ) {
      return [
        imgPrincipal,
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
      ];
    }

    if (
      texto.includes("monitor") ||
      texto.includes("pantalla") ||
      texto.includes("ultrawide")
    ) {
      return [
        imgPrincipal,
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
        "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&q=80",
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80",
      ];
    }

    if (
      texto.includes("bulb") ||
      texto.includes("luz") ||
      texto.includes("hue") ||
      texto.includes("hogar")
    ) {
      return [
        imgPrincipal,
        "https://images.unsplash.com/photo-1550985616-10810253b84d?w=800&q=80",
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
      ];
    }

    if (
      texto.includes("auricular") ||
      texto.includes("headphone") ||
      texto.includes("audio") ||
      texto.includes("sony")
    ) {
      return [
        imgPrincipal,
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
      ];
    }

    return [
      imgPrincipal,
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    ];
  };

  const fotosMiniatura = obtenerMiniaturasPorProducto(
    producto.nombre,
    producto.categoria,
    producto.imagen,
  );

  const [fotoActiva, setFotoActiva] = useState(fotosMiniatura[0]);
  useEffect(() => {
    setFotoActiva(producto.imagen);
  }, [producto.id, producto.imagen]);

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

  const manejarCarrito = (prod: Producto, cant: number = 1) => {
    agregarAlCarrito(prod.id, cant);
    if (alAgregarAlCarrito) {
      alAgregarAlCarrito(prod, cant);
    }
  };

  const accesoriosAMostrar =
    productosRecomendados.length > 0
      ? productosRecomendados.slice(0, 3).map((p) => ({
          id: p.id,
          nombre: p.nombre,
          categoria: p.categoria,
          precio: p.precio,
          imagen: p.imagen,
          etiqueta: "Recomendado",
        }))
      : ACCESORIOS_DEFECTO;

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
                onClick={() => manejarCarrito(producto, cantidad)}
                className="py-3 px-6 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🛒</span>
                <span>Añadir al Carrito</span>
              </button>
              <button
                type="button"
                onClick={() => manejarCarrito(producto, cantidad)}
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
            Calibración de presión atmosférica constante y 8 micrófonos que
            aíslan las frecuencias vocales y agudas.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-secondary-200 shadow-xs space-y-2">
          <span className="text-2xl block">🔋</span>
          <h3 className="font-heading font-bold text-sm text-secondary-900">
            Autonomía de 30h
          </h3>
          <p className="text-xs text-secondary-500 leading-relaxed">
            Batería masiva para viajes largos. Carga ultrarrápida USB-PD: 3
            minutos otorgan 3 horas completas de uso.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-secondary-200 shadow-xs space-y-2">
          <span className="text-2xl block">🔊</span>
          <h3 className="font-heading font-bold text-sm text-secondary-900">
            Diafragma 30mm en Carbono
          </h3>
          <p className="text-xs text-secondary-500 leading-relaxed">
            Cúpula de fibra de carbono ultra-rígida para una claridad acústica
            superior y graves profundos sin distorsión.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-secondary-200 shadow-xs space-y-2">
          <span className="text-2xl block">📱</span>
          <h3 className="font-heading font-bold text-sm text-secondary-900">
            Conexión Multipunto
          </h3>
          <p className="text-xs text-secondary-500 leading-relaxed">
            Emparejamiento simultáneo con dos dispositivos Bluetooth®. Pasa del
            portátil al smartphone con total fluidez.
          </p>
        </div>
      </section>
      <section className="bg-white rounded-3xl border border-secondary-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex border-b border-secondary-200 gap-2 sm:gap-4 overflow-x-auto">
          <button
            type="button"
            onClick={() => setPestana("descripcion")}
            className={`pb-4 px-2 text-xs sm:text-sm font-heading font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              pestana === "descripcion"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-secondary-500 hover:text-secondary-900"
            }`}
          >
            Descripción &amp; Tecnologías
          </button>
          <button
            type="button"
            onClick={() => setPestana("especificaciones")}
            className={`pb-4 px-2 text-xs sm:text-sm font-heading font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              pestana === "especificaciones"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-secondary-500 hover:text-secondary-900"
            }`}
          >
            Especificaciones Técnicas
          </button>
          <button
            type="button"
            onClick={() => setPestana("opiniones")}
            className={`pb-4 px-2 text-xs sm:text-sm font-heading font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              pestana === "opiniones"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-secondary-500 hover:text-secondary-900"
            }`}
          >
            Opiniones de Compradores (342)
          </button>
        </div>
        {pestana === "descripcion" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-bold text-primary-500 uppercase tracking-wider block">
                Silencio Redefinido
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-secondary-900">
                Un nuevo estándar de cancelación activa de ruido líder en la
                industria.
              </h3>
              <p className="text-xs sm:text-sm text-secondary-600 leading-relaxed">
                {producto.descripcion}
              </p>
              <p className="text-xs text-secondary-500 leading-relaxed">
                El controlador de 30 mm diseñado con precisión, que cuenta con
                una cúpula ligera y rígida con material compuesto de fibra de
                carbono, mejora la sensibilidad en las frecuencias altas para
                lograr una tonalidad mucho más natural y cristalina.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-secondary-100 max-w-md">
                <div>
                  <span className="font-heading font-bold text-secondary-900 text-sm block">
                    8 Mics
                  </span>
                  <span className="text-[11px] text-secondary-400 block">
                    Array beamforming
                  </span>
                </div>
                <div>
                  <span className="font-heading font-bold text-secondary-900 text-sm block">
                    LDAC
                  </span>
                  <span className="text-[11px] text-secondary-400 block">
                    Hi-Res Audio 990kbps
                  </span>
                </div>
                <div>
                  <span className="font-heading font-bold text-secondary-900 text-sm block">
                    250g
                  </span>
                  <span className="text-[11px] text-secondary-400 block">
                    Ultralivianos
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-secondary-50 rounded-2xl p-4 border border-secondary-100 flex items-center justify-center">
              <img
                src={producto.imagen}
                alt="Tecnología interna"
                className="max-h-64 object-contain rounded-xl opacity-90"
              />
            </div>
          </div>
        )}
        {pestana === "especificaciones" && (
          <div className="pt-2 max-w-2xl space-y-3">
            <h3 className="font-heading font-bold text-sm text-secondary-900 mb-2">
              Ficha Técnica Oficial
            </h3>
            <div className="divide-y divide-secondary-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-secondary-500">Identificador SKU:</span>
                <span className="font-mono font-bold text-secondary-900">
                  {producto.id}
                </span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-secondary-500">Categoría:</span>
                <span className="font-semibold text-secondary-900">
                  {producto.categoria}
                </span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-secondary-500">Fabricante / Marca:</span>
                <span className="font-semibold text-secondary-900">
                  {producto.marca || "Lumina"}
                </span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-secondary-500">Peso:</span>
                <span className="font-semibold text-secondary-900">
                  250 gramos
                </span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-secondary-500">Conectividad:</span>
                <span className="font-semibold text-secondary-900">
                  Bluetooth 5.2 / Jack 3.5mm
                </span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-secondary-500">Garantía Oficial:</span>
                <span className="font-semibold text-tertiary-600">
                  24 meses internacional
                </span>
              </div>
            </div>
          </div>
        )}
        {pestana === "opiniones" && (
          <div className="pt-2 space-y-4 max-w-3xl">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary-50 border border-secondary-100">
              <span className="text-4xl font-heading font-extrabold text-secondary-900">
                {(producto.calificacion || 4.9).toFixed(1)}
              </span>
              <div>
                <div className="text-advertencia text-sm">★★★★★</div>
                <span className="text-xs text-secondary-500">
                  Basado en 342 valoraciones certificadas de compradores reales.
                </span>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl border border-secondary-100 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-secondary-900">
                    Federico Gómez
                  </span>
                  <span className="text-secondary-400">Hace 3 días</span>
                </div>
                <div className="text-advertencia text-xs">★★★★★</div>
                <p className="text-xs text-secondary-600">
                  La calidad acústica es impresionante y la cancelación de ruido
                  en la oficina supera todo lo que probé antes. Vale cada
                  centavo.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-secondary-100 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-secondary-900">
                    Lucía Fernández
                  </span>
                  <span className="text-secondary-400">Hace 1 semana</span>
                </div>
                <div className="text-advertencia text-xs">★★★★★</div>
                <p className="text-xs text-secondary-600">
                  La batería dura semanas con uso moderado y el peso es
                  imperceptible. Compré en cuotas y llegó en menos de 24 horas.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="space-y-6 pt-4 border-t border-secondary-200/60">
        <div>
          <span className="text-[11px] font-bold text-primary-500 uppercase tracking-wider block">
            Completa Tu Setup
          </span>
          <h2 className="text-2xl font-heading font-bold text-secondary-900">
            Accesorios recomendados por Lumina
          </h2>
          <p className="text-xs text-secondary-500 mt-1">
            Componentes optimizados para extender la vida útil y el rendimiento
            de tu equipo.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {accesoriosAMostrar.map((acc) => (
            <div
              key={acc.id}
              className="bg-white rounded-2xl border border-secondary-200 p-4 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="relative aspect-4/3 w-full bg-secondary-50 rounded-xl overflow-hidden flex items-center justify-center p-3">
                  <img
                    src={acc.imagen}
                    alt={acc.nombre}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 text-[10px] font-bold rounded-md bg-white/90 backdrop-blur-xs text-secondary-800 border border-secondary-200 shadow-xs">
                    {acc.etiqueta}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-400 block">
                    {acc.categoria}
                  </span>
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-secondary-900 line-clamp-2 leading-snug">
                    {acc.nombre}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-secondary-100">
                <span className="text-base font-heading font-extrabold text-secondary-900">
                  ${acc.precio.toFixed(2)}{" "}
                  <span className="text-[10px] font-normal text-secondary-400">
                    USD
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    agregarAlCarrito(acc.id, 1);
                  }}
                  title="Añadir accesorio al carrito"
                  className="w-8 h-8 rounded-xl bg-primary-50 text-primary-600 hover:bg-primary-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
