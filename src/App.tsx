import { useState, useMemo } from "react";
import { ProveedorProductos, useProductos } from "./context/ProductosContext";
import { GrillaProductos } from "./components/GrillaProductos";
import { BuscadorCategorias } from "./components/BuscadorCategorias";
import { FiltrosLaterales } from "./components/FiltrosLaterales";
import { ProveedorAutenticacion } from "./context/ContextoAutenticacion";
import { Navbar } from "./components/Navbar";
import { ProveedorDeseos, useDeseos } from "./context/ContextoDeseos";
import { useAutenticacion } from "./context/ContextoAutenticacion";
import { Footer } from "./components/Footer";
import { MetricasAdmin } from "./components/MetricasAdmin";
import { TablaProductosAdmin } from "./components/TablaProductosAdmin";
import { Pagina404 } from "./pages/Pagina404";
import { PaginaNosotros } from "./pages/PaginaSobreNosotros";
import { DetalleProducto } from "./pages/DetalleProducto";
import type { Producto } from "./types/Producto";
import { HeroBanner } from "./components/HeroBanner";
import { ModalProducto } from "./components/ModalProducto";

const PRECIO_LIMITE = 2500;

interface PropiedadesVistaCatalogo {
  alVerDetalle: (producto: Producto) => void;
}

function VistaCatalogo({ alVerDetalle }: PropiedadesVistaCatalogo) {
  const { productos } = useProductos();
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [criterioOrden, setCriterioOrden] = useState("populares");

  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState<string[]>([]);
  const [precioMaximo, setPrecioMaximo] = useState(PRECIO_LIMITE);
  const [soloEnStock, setSoloEnStock] = useState(false);
  const [soloConDescuento, setSoloConDescuento] = useState(false);
  const [calificacionMinima, setCalificacionMinima] = useState(0);

  const marcasDisponibles = useMemo(() => {
    const conjunto = new Set<string>();
    productos.forEach((p) => {
      if (p.marca) conjunto.add(p.marca);
    });
    return Array.from(conjunto);
  }, [productos]);

  const alternarMarca = (marca: string) => {
    setMarcasSeleccionadas((previas) =>
      previas.includes(marca)
        ? previas.filter((m) => m !== marca)
        : [...previas, marca],
    );
  };

  const reiniciarFiltros = () => {
    setMarcasSeleccionadas([]);
    setPrecioMaximo(PRECIO_LIMITE);
    setSoloEnStock(false);
    setSoloConDescuento(false);
    setCalificacionMinima(0);
  };

  const productosFiltrados = useMemo(() => {
    return productos
      .filter((producto) => {
        const coincideBusqueda =
          producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          producto.descripcion.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCategoria =
          categoriaSeleccionada === "Todos" ||
          producto.categoria === categoriaSeleccionada;
        const coincideMarca =
          marcasSeleccionadas.length === 0 ||
          (producto.marca && marcasSeleccionadas.includes(producto.marca));
        const coincidePrecio = producto.precio <= precioMaximo;
        const coincideStock = !soloEnStock || producto.stock > 0;
        const coincideDescuento =
          !soloConDescuento ||
          (producto.descuento !== undefined && producto.descuento > 0);
        const coincideCalificacion =
          calificacionMinima === 0 ||
          (producto.calificacion !== undefined &&
            producto.calificacion >= calificacionMinima);
        return (
          coincideBusqueda &&
          coincideCategoria &&
          coincideMarca &&
          coincidePrecio &&
          coincideStock &&
          coincideDescuento &&
          coincideCalificacion
        );
      })
      .sort((a, b) => {
        if (criterioOrden === "menor-precio") return a.precio - b.precio;
        if (criterioOrden === "mayor-precio") return b.precio - a.precio;
        return (b.calificacion || 0) - (a.calificacion || 0);
      });
  }, [
    productos,
    busqueda,
    categoriaSeleccionada,
    criterioOrden,
    marcasSeleccionadas,
    precioMaximo,
    soloEnStock,
    soloConDescuento,
    calificacionMinima,
  ]);
  return (
    <>
      <HeroBanner />
      <main
        id="seccion-catalogo"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <header className="mb-6">
          <h1 className="text-3xl font-heading font-bold text-secondary-900">
            Catálogo de Productos
          </h1>
          <p className="text-secondary-500 text-sm mt-1">
            Explora nuestra selección de dispositivos y accesorios de última
            generación.
          </p>
        </header>
        <BuscadorCategorias
          busqueda={busqueda}
          alCambiarBusqueda={setBusqueda}
          categoriaSeleccionada={categoriaSeleccionada}
          alSeleccionarCategoria={setCategoriaSeleccionada}
          criterioOrden={criterioOrden}
          alCambiarOrden={setCriterioOrden}
        />
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <FiltrosLaterales
            marcasDisponibles={marcasDisponibles}
            marcasSeleccionadas={marcasSeleccionadas}
            alCambiarMarca={alternarMarca}
            precioMaximo={precioMaximo}
            precioLimite={PRECIO_LIMITE}
            alCambiarPrecioMaximo={setPrecioMaximo}
            soloEnStock={soloEnStock}
            alCambiarSoloEnStock={setSoloEnStock}
            soloConDescuento={soloConDescuento}
            alCambiarSoloConDescuento={setSoloConDescuento}
            calificacionMinima={calificacionMinima}
            alCambiarCalificacionMinima={setCalificacionMinima}
            alReiniciarFiltros={reiniciarFiltros}
          />
          <div className="flex-1 w-full">
            <GrillaProductos
              productos={productosFiltrados}
              alVerDetalle={alVerDetalle}
            />
          </div>
        </div>
      </main>
    </>
  );
}

function ContenidoPrincipal() {
  const [seccion, setSeccion] = useState("catalogo");
  const { cantidadDeseos } = useDeseos();
  const { esAdmin } = useAutenticacion();
  const { productos } = useProductos();
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState<Producto | null>(null);

  const abrirCrear = () => {
    setProductoAEditar(null);
    setModalAbierto(true);
  };
  const abrirEditar = (prod: Producto) => {
    setProductoAEditar(prod);
    setModalAbierto(true);
  };

  const verDetalleDeProducto = (prod: Producto) => {
    setProductoSeleccionado(prod);
    setSeccion("detalle");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between">
      <div>
        <Navbar
          seccionActiva={seccion}
          alNavegar={setSeccion}
          cantidadDeseos={cantidadDeseos}
        />
        {seccion === "catalogo" && (
          <VistaCatalogo alVerDetalle={verDetalleDeProducto} />
        )}
        {seccion === "detalle" && productoSeleccionado && (
          <DetalleProducto
            producto={productoSeleccionado}
            alVolver={() => setSeccion("catalogo")}
          />
        )}
        {seccion === "nosotros" && <PaginaNosotros alNavegar={setSeccion} />}
        {seccion === "admin" &&
          (esAdmin ? (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
              <MetricasAdmin productos={productos} />
              <TablaProductosAdmin
                alCrearNuevo={abrirCrear}
                alEditarProducto={abrirEditar}
              />
              {/* 👇 AQUÍ RENDERIZAS EL MODAL 👇 */}
              <ModalProducto
                abierto={modalAbierto}
                alCerrar={() => setModalAbierto(false)}
                productoAEditar={productoAEditar}
              />
            </main>
          ) : (
            <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-2xl border border-secondary-200 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 mx-auto rounded-full bg-error/10 text-error flex items-center justify-center font-bold text-xl">
                ✕
              </div>
              <h2 className="text-xl font-heading font-bold text-secondary-900">
                Acceso Restringido
              </h2>
              <p className="text-xs text-secondary-500">
                Esta sección está reservada exclusivamente para administradores.
                Por favor, cambia tu rol a <strong>Admin</strong> desde la barra
                superior para continuar.
              </p>
              <button
                type="button"
                onClick={() => setSeccion("catalogo")}
                className="px-4 py-2 bg-primary-500 text-white text-xs font-semibold rounded-xl hover:bg-primary-600 cursor-pointer"
              >
                Volver al Catálogo
              </button>
            </div>
          ))}
        {seccion === "404" && (
          <Pagina404 alNavegar={setSeccion} productos={productos} />
        )}
      </div>
      <Footer alNavegar={setSeccion} />
    </div>
  );
}
function App() {
  return (
    <ProveedorAutenticacion>
      <ProveedorProductos>
        <ProveedorDeseos>
          <ContenidoPrincipal />
        </ProveedorDeseos>
      </ProveedorProductos>
    </ProveedorAutenticacion>
  );
}

export default App;
