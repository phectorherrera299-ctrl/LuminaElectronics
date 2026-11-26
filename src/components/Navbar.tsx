import { useState, useEffect } from "react";
import { useAutenticacion } from "../context/ContextoAutenticacion";
import { useCarrito } from "../context/ContextoCarrito";
import { useDeseos } from "../context/ContextoDeseos";
import { useProductos } from "../context/ProductosContext";

interface PropiedadesNavbar {
  cantidadDeseos?: number;
  cantidadCarrito?: number;
  seccionActiva?: string;
  alNavegar?: (seccion: string) => void;
}

export const Navbar = ({
  cantidadDeseos = 0,
  cantidadCarrito = 0,
  seccionActiva = "catalogo",
  alNavegar,
}: PropiedadesNavbar) => {
  const { usuario, cambiarRol, esAdmin, cerrarSesion } = useAutenticacion();
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();
  const { deseos, alternarDeseo } = useDeseos();
  const { productos } = useProductos();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [modalUsuarioAbierto, setModalUsuarioAbierto] = useState(false);
  const [modalCarritoAbierto, setModalCarritoAbierto] = useState(false);
  const [modalDeseosAbierto, setModalDeseosAbierto] = useState(false);

  const [nombreEditado, setNombreEditado] = useState(usuario.nombre);
  const [editandoPerfil, setEditandoPerfil] = useState(false);

  useEffect(() => {
    setNombreEditado(usuario.nombre);
  }, [usuario.nombre]);

  useEffect(() => {
    const manejarTeclaEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalCarritoAbierto(false);
        setModalDeseosAbierto(false);
        setModalUsuarioAbierto(false);
      }
    };
    window.addEventListener("keydown", manejarTeclaEscape);
    return () => window.removeEventListener("keydown", manejarTeclaEscape);
  }, []);

  const manejarNavegacion = (seccion: string) => {
    if (alNavegar) alNavegar(seccion);
    setMenuAbierto(false);
    setModalCarritoAbierto(false);
    setModalDeseosAbierto(false);
    setModalUsuarioAbierto(false);
  };

  const itemsCarritoCompletos = carrito
    .map((item) => {
      const prod = productos.find((p) => p.id === item.id);
      return prod ? { ...prod, cantidadSeleccionada: item.cantidad } : null;
    })
    .filter(Boolean);

  const totalPrecioCarrito = itemsCarritoCompletos.reduce(
    (acc, item) =>
      acc +
      (item
        ? item.precio *
          (1 - (item.descuento || 0) / 100) *
          item.cantidadSeleccionada
        : 0),
    0,
  );

  const itemsDeseosCompletos = deseos
    .map((id) => productos.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <>
      <header className="sticky top-0 z-40 bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-950 backdrop-blur-md border-b border-primary-500/20 text-white shadow-xl">
        <div className="bg-gradient-to-r from-primary-800 via-indigo-700 to-purple-800 text-white text-[11px] py-1.5 px-4 text-center hidden md:block tracking-wide">
          <span className="font-bold text-primary-200">
            NUEVA TEMPORADA 2026
          </span>{" "}
          • Aprovecha 15% OFF con el código{" "}
          <strong className="text-white underline">LUMINA15</strong>
        </div>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => manejarNavegacion("catalogo")}
              className="flex items-center gap-2 text-left cursor-pointer"
            >
              <img
                src="/logo/logoLumina.png"
                alt="Lumina Electronics Logo"
                className="w-12 h-12 object-contain drop-shadow-md transition-transform hover:scale-105"
              />
              <div>
                <span className="font-heading font-extrabold text-white text-base leading-none block">
                  Lumina
                </span>
                <span className="text-[9px] tracking-widest text-primary-300 uppercase font-bold block">
                  Electronics
                </span>
              </div>
            </button>
            <div className="hidden md:flex items-center gap-6 text-xs font-semibold">
              <button
                type="button"
                onClick={() => manejarNavegacion("catalogo")}
                className={`transition-colors cursor-pointer ${
                  seccionActiva === "catalogo"
                    ? "text-primary-300 font-bold"
                    : "text-indigo-200 hover:text-white"
                }`}
              >
                Catálogo
              </button>
              <button
                type="button"
                onClick={() => manejarNavegacion("nosotros")}
                className={`transition-colors cursor-pointer ${
                  seccionActiva === "nosotros"
                    ? "text-primary-300 font-bold"
                    : "text-indigo-200 hover:text-white"
                }`}
              >
                Nosotros
              </button>
              {esAdmin && (
                <button
                  type="button"
                  onClick={() => manejarNavegacion("admin")}
                  className={`transition-colors cursor-pointer flex items-center gap-1.5 ${
                    seccionActiva === "admin"
                      ? "text-primary-300 font-bold"
                      : "text-indigo-200 hover:text-white"
                  }`}
                >
                  Admin Panel
                  <span className="px-1.5 py-0.2 text-[9px] bg-primary-500 text-white rounded-md font-bold shadow-xs">
                    PRO
                  </span>
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {usuario.rol === "Invitado" ? (
              <button
                type="button"
                onClick={() => manejarNavegacion("login")}
                className="hidden sm:inline-flex rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-2 text-xs font-bold text-white transition cursor-pointer"
              >
                Iniciar sesión
              </button>
            ) : (
              <button
                type="button"
                onClick={cerrarSesion}
                className="hidden sm:inline-flex rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 px-3 py-1.5 text-xs font-semibold text-indigo-200 hover:text-white transition cursor-pointer"
              >
                Salir
              </button>
            )}
            {usuario.email === "admin@lumina.dev" && (
              <div className="flex items-center bg-black/40 border border-white/10 p-0.5 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => cambiarRol("Invitado")}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    !esAdmin
                      ? "bg-white text-secondary-900 shadow-xs"
                      : "text-indigo-300 hover:text-white"
                  }`}
                >
                  Invitado
                </button>
                <button
                  type="button"
                  onClick={() => cambiarRol("Admin")}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    esAdmin
                      ? "bg-primary-500 text-white shadow-xs"
                      : "text-indigo-300 hover:text-white"
                  }`}
                >
                  Admin
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={() => setModalDeseosAbierto(true)}
              aria-label="Lista de deseos"
              className="relative w-9 h-9 rounded-xl border border-white/20 bg-white/5 text-indigo-200 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
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
              {cantidadDeseos > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-error text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {cantidadDeseos}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setModalCarritoAbierto(true)}
              aria-label="Carrito de compras"
              className="relative w-9 h-9 rounded-xl border border-white/20 bg-white/5 text-indigo-200 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              {cantidadCarrito > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {cantidadCarrito}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setNombreEditado(usuario.nombre);
                setModalUsuarioAbierto(true);
              }}
              className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10 text-left hover:opacity-85 transition cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-primary-500/30 border border-primary-400 text-primary-200 overflow-hidden flex items-center justify-center font-bold text-xs">
                {usuario.nombre.charAt(0).toUpperCase()}
              </div>
              <div className="text-left text-xs">
                <span className="font-semibold text-white block leading-tight">
                  {usuario.nombre}
                </span>
                <span className="text-[10px] text-indigo-300 block">
                  {usuario.rol} • Editar ✎
                </span>
              </div>
            </button>
          </div>
        </nav>
      </header>
      {modalUsuarioAbierto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalUsuarioAbierto(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in text-secondary-900"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-indigo-100 space-y-5 my-auto">
            <div className="flex items-center justify-between border-b border-secondary-100 pb-3">
              <h3 className="font-heading font-extrabold text-lg text-secondary-900">
                Mi Perfil de Usuario
              </h3>
              <button
                type="button"
                onClick={() => setModalUsuarioAbierto(false)}
                className="w-8 h-8 rounded-full bg-secondary-100 hover:bg-secondary-200 flex items-center justify-center text-sm font-bold text-secondary-600 cursor-pointer transition"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center gap-4 bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary-600 to-indigo-600 text-white flex items-center justify-center font-heading font-extrabold text-lg shadow-sm">
                {usuario.nombre.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-sm text-secondary-900">
                  {usuario.nombre}
                </p>
                <p className="text-xs text-secondary-500">{usuario.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-primary-100 text-primary-700 font-bold text-[10px]">
                  Rol: {usuario.rol}
                </span>
              </div>
            </div>
            {editandoPerfil ? (
              <div className="space-y-3">
                <label className="text-xs font-bold text-secondary-700 block">
                  Editar Nombre Público
                </label>
                <input
                  type="text"
                  value={nombreEditado}
                  onChange={(e) => setNombreEditado(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-secondary-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditandoPerfil(false)}
                    className="px-3 py-1.5 text-xs text-secondary-600 hover:bg-secondary-100 rounded-xl transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (nombreEditado.trim()) {
                        usuario.nombre = nombreEditado.trim();
                        setEditandoPerfil(false);
                      }
                    }}
                    className="px-4 py-1.5 text-xs font-bold text-white bg-primary-500 hover:bg-primary-600 rounded-xl shadow-xs transition"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-2 flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setEditandoPerfil(true)}
                  className="flex-1 py-2.5 text-xs font-bold text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-200 rounded-xl transition cursor-pointer"
                >
                  Modificar Datos ✎
                </button>
                {usuario.rol === "Invitado" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setModalUsuarioAbierto(false);
                      manejarNavegacion("login");
                    }}
                    className="flex-1 py-2.5 text-xs font-bold text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition cursor-pointer"
                  >
                    Iniciar Sesión →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      cerrarSesion();
                      setModalUsuarioAbierto(false);
                    }}
                    className="flex-1 py-2.5 text-xs font-bold text-error bg-error/10 hover:bg-error/20 rounded-xl transition cursor-pointer"
                  >
                    Cerrar Sesión
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {modalCarritoAbierto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalCarritoAbierto(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in text-secondary-900"
        >
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl border border-indigo-100 flex flex-col justify-between max-h-[85vh] overflow-hidden my-auto">
            <div>
              <div className="flex items-center justify-between border-b border-secondary-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🛒</span>
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-secondary-900 leading-tight">
                      Tu Carrito de Compras
                    </h3>
                    <p className="text-xs text-secondary-500">
                      {cantidadCarrito} producto(s) añadido(s)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalCarritoAbierto(false)}
                  className="w-9 h-9 rounded-full bg-secondary-100 hover:bg-secondary-200 flex items-center justify-center text-sm font-bold text-secondary-700 cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="divide-y divide-secondary-100 max-h-[48vh] overflow-y-auto py-2 pr-1">
                {itemsCarritoCompletos.length === 0 ? (
                  <div className="text-center py-10 space-y-3">
                    <p className="text-5xl">🛍️</p>
                    <h4 className="text-base font-bold text-secondary-800">
                      Tu carrito está vacío
                    </h4>
                    <p className="text-xs text-secondary-400 max-w-xs mx-auto">
                      Explora nuestros productos en el catálogo y añade tus
                      favoritos.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setModalCarritoAbierto(false);
                        manejarNavegacion("catalogo");
                      }}
                      className="mt-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md hover:scale-105 transition-all cursor-pointer"
                    >
                      Explorar Catálogo →
                    </button>
                  </div>
                ) : (
                  itemsCarritoCompletos.map((item) => {
                    if (!item) return null;
                    const precioUnitario = item.descuento
                      ? item.precio * (1 - item.descuento / 100)
                      : item.precio;
                    return (
                      <div
                        key={item.id}
                        className="py-3 flex items-center justify-between gap-3"
                      >
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="w-14 h-14 object-contain rounded-xl bg-secondary-50 p-1 border border-secondary-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-secondary-900 truncate">
                            {item.nombre}
                          </p>
                          <p className="text-[11px] text-secondary-500">
                            {item.cantidadSeleccionada}x $
                            {precioUnitario.toFixed(2)} USD
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => eliminarDelCarrito(item.id)}
                          className="text-error hover:bg-error/10 p-2 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                          title="Eliminar producto"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            {itemsCarritoCompletos.length > 0 ? (
              <div className="border-t border-secondary-100 pt-4 space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-secondary-600">Total a Pagar:</span>
                  <span className="text-xl font-heading font-extrabold text-primary-600">
                    ${totalPrecioCarrito.toFixed(2)} USD
                  </span>
                </div>
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={vaciarCarrito}
                    className="py-3 px-4 text-xs font-bold text-secondary-600 bg-secondary-100 hover:bg-secondary-200 rounded-xl transition cursor-pointer"
                  >
                    Vaciar Carrito
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      alert(
                        "¡Gracias por tu compra de demostración en Lumina Electronics!",
                      );
                      vaciarCarrito();
                      setModalCarritoAbierto(false);
                    }}
                    className="flex-1 py-3 text-xs font-bold text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
                  >
                    Finalizar Compra →
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-2 border-t border-secondary-100">
                <button
                  type="button"
                  onClick={() => setModalCarritoAbierto(false)}
                  className="w-full py-2.5 text-xs font-bold text-secondary-600 hover:text-secondary-900 bg-secondary-100 hover:bg-secondary-200 rounded-xl transition cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {modalDeseosAbierto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalDeseosAbierto(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in text-secondary-900"
        >
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl border border-indigo-100 flex flex-col justify-between max-h-[85vh] overflow-hidden my-auto">
            <div>
              <div className="flex items-center justify-between border-b border-secondary-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">❤️</span>
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-secondary-900 leading-tight">
                      Lista de Deseos
                    </h3>
                    <p className="text-xs text-secondary-500">
                      {cantidadDeseos} producto(s) guardado(s)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalDeseosAbierto(false)}
                  className="w-9 h-9 rounded-full bg-secondary-100 hover:bg-secondary-200 flex items-center justify-center text-sm font-bold text-secondary-700 cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="divide-y divide-secondary-100 max-h-[50vh] overflow-y-auto py-2 pr-1">
                {itemsDeseosCompletos.length === 0 ? (
                  <div className="text-center py-10 space-y-3">
                    <p className="text-5xl">🤍</p>
                    <h4 className="text-base font-bold text-secondary-800">
                      Aún no tienes favoritos
                    </h4>
                    <p className="text-xs text-secondary-400 max-w-xs mx-auto">
                      Explora el catálogo y guarda los artículos que más te
                      gusten con el corazón.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setModalDeseosAbierto(false);
                        manejarNavegacion("catalogo");
                      }}
                      className="mt-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md hover:scale-105 transition-all cursor-pointer"
                    >
                      Explorar Catálogo →
                    </button>
                  </div>
                ) : (
                  itemsDeseosCompletos.map((item) => {
                    if (!item) return null;
                    return (
                      <div
                        key={item.id}
                        className="py-3 flex items-center justify-between gap-3"
                      >
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="w-14 h-14 object-contain rounded-xl bg-secondary-50 p-1 border border-secondary-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-secondary-900 truncate">
                            {item.nombre}
                          </p>
                          <p className="text-xs font-extrabold text-primary-600">
                            ${item.precio.toFixed(2)} USD
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setModalDeseosAbierto(false);
                              manejarNavegacion(`producto/${item.id}`);
                            }}
                            className="px-3 py-1.5 text-xs font-bold bg-primary-50 text-primary-600 hover:bg-primary-500 hover:text-white rounded-xl transition cursor-pointer"
                          >
                            Ver
                          </button>
                          <button
                            type="button"
                            onClick={() => alternarDeseo(item.id)}
                            className="text-error hover:bg-error/10 p-2 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                            title="Quitar de favoritos"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="pt-2 border-t border-secondary-100">
              <button
                type="button"
                onClick={() => setModalDeseosAbierto(false)}
                className="w-full py-2.5 text-xs font-bold text-secondary-600 hover:text-secondary-900 bg-secondary-100 hover:bg-secondary-200 rounded-xl transition cursor-pointer"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
