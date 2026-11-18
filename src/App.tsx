import { ProveedorProductos, useProductos } from './context/ProductosContext'
import { GrillaProductos } from './components/GrillaProductos'
function VistaCatalogo() {
  const { productos } = useProductos()

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-secondary-900">
          Catálogo de Productos
        </h1>
        <p className="text-secondary-500 text-sm mt-1">
          Explora nuestra selección de dispositivos y accesorios de última generación.
        </p>
      </header>
      <GrillaProductos productos={productos} />
    </main>
  )
}

function App() {
  return (
    <ProveedorProductos>
      <div className="min-h-screen bg-neutral-50">
        <VistaCatalogo />
      </div>
    </ProveedorProductos>
  )
}

export default App