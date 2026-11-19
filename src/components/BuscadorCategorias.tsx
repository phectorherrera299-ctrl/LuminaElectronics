interface PropiedadesBuscadorCategorias {
    busqueda: string
    alCambiarBusqueda: (texto: string) => void
    categoriaSeleccionada: string
    alSeleccionarCategoria: (categoria: string) => void
    criterioOrden: string
    alCambiarOrden: (criterio: string) => void
}

const CATEGORIAS= [
    "Todos",
    "Computacion",
    "Audio",
    "Gaming",
    "Monitores",
    "Hogar",
    "Accesorios"
]

export const BuscadorCategorias= ({
    busqueda,
    alCambiarBusqueda,
    categoriaSeleccionada,
    alSeleccionarCategoria,
    criterioOrden,
    alCambiarOrden 
}: PropiedadesBuscadorCategorias) => {
}
