import { useState, useMemo } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { ProveedorProductos, useProductos } from "./context/ProductosContext";
import { GrillaProductos } from "./components/GrillaProductos";
import { BuscadorCategorias } from "./components/BuscadorCategorias";
import { FiltrosLaterales } from "./components/FiltrosLaterales";
import { ProveedorAutenticacion } from "./context/ContextoAutenticacion";
import { Navbar } from "./components/Navbar";
import { ProveedorDeseos, useDeseos } from "./context/ContextoDeseos";
import { Footer } from "./components/Footer";
import { MetricasAdmin } from "./components/MetricasAdmin";
import { TablaProductosAdmin } from "./components/TablaProductosAdmin";
import { TablaGestionUsuarios } from "./components/TablaGestionUsuarios";
import { ModalProducto } from "./components/ModalProducto";
import { RutaProtegida } from "./components/RutaProtegida";
import { Pagina404 } from "./pages/Pagina404";
import { PaginaNosotros } from "./pages/PaginaSobreNosotros";
import { DetalleProducto } from "./pages/DetalleProducto";
import { LoginPage } from "./pages/LoginPage";
import RegistroCuenta from "./pages/RegistroCuenta";
import { HeroBanner } from "./components/HeroBanner";
import type { Producto } from "./types/Producto";

const PRECIO_LIMITE = 2500;

function VistaCatalogo({ alVerDetalle }: { alVerDetalle: (prod: Producto) => void }) {
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
            Explora nuestra selección de dispositivos y accesorios de última generación.
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
function VistaDetalleWrapper() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { productos } = useProductos();

  const producto = productos.find((p) => String(p.id) === String(id));

  if (!producto) {
    return <Pagina404 alNavegar={(ruta) => navigate(`/${ruta}`)} productos={productos} />;
  }

  return (
    <DetalleProducto
      producto={producto}
      alVolver={() => navigate("/")}
    />
  );
}
function VistaAdmin() {
  const { productos } = useProductos();
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

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <MetricasAdmin productos={productos} />
      <TablaProductosAdmin
        alCrearNuevo={abrirCrear}
        alEditarProducto={abrirEditar}
      />
      <TablaGestionUsuarios />
      <ModalProducto
        abierto={modalAbierto}
        alCerrar={() => setModalAbierto(false)}
        productoAEditar={productoAEditar}
      />
    </main>
  );
}
function ContenidoPrincipal() {
  const navigate = useNavigate();
  const { cantidadDeseos } = useDeseos();
  const { productos } = useProductos();

  const irADetalle = (prod: Producto) => {
    navigate(`/producto/${prod.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between">
      <div>
        <Navbar
          cantidadDeseos={cantidadDeseos}
          alNavegar={(seccion) => {
            if (seccion === "catalogo") navigate("/");
            else navigate(`/${seccion}`);
          }}
        />
        <Routes>
          <Route path="/" element={<VistaCatalogo alVerDetalle={irADetalle} />} />
          <Route path="/producto/:id" element={<VistaDetalleWrapper />} />
          <Route path="/nosotros" element={<PaginaNosotros alNavegar={(s) => navigate(s === "catalogo" ? "/" : `/${s}`)} />} />
          <Route path="/login" element={<LoginPage alNavegar={(s) => navigate(s === "catalogo" ? "/" : `/${s}`)} />} />
          <Route path="/registro" element={<RegistroCuenta onIrLogin={() => navigate("/login")} />} />
          <Route
            path="/admin"
            element={
              <RutaProtegida>
                <VistaAdmin />
              </RutaProtegida>
            }
          />
          <Route path="*" element={<Pagina404 alNavegar={(s) => navigate(s === "catalogo" ? "/" : `/${s}`)} productos={productos} />} />
        </Routes>
      </div>
      <Footer alNavegar={(s) => navigate(s === "catalogo" ? "/" : `/${s}`)} />
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