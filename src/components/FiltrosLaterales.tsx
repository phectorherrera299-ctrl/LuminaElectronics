interface PropiedadesFiltrosLaterales {
    marcasDisponibles: string[]
    marcasSeleccionadas: string[]
    alCambiarMarca: (marca:string) => void
    precioMaximo: number
    precioLimite: number
    alCambiarPrecioMaximo: (precio: number) => void
    soloEnStock: boolean
    alCambiarSoloEnStock: (valor: boolean) => void
    soloConDescuento: boolean
    alCambiarSoloConDescuento: (valor: boolean) => void
    calificacionMinima: number
    alCambiarCalificacionMinima: (calificacion: number) => void
    alReiniciarFiltros: () => void
}

export const FiltrosLaterales = ({
  marcasDisponibles,
  marcasSeleccionadas,
  alCambiarMarca,
  precioMaximo,
  precioLimite,
  alCambiarPrecioMaximo,
  soloEnStock,
  alCambiarSoloEnStock,
  soloConDescuento,
  alCambiarSoloConDescuento,
  calificacionMinima,
  alCambiarCalificacionMinima,
  alReiniciarFiltros
}: PropiedadesFiltrosLaterales) =>{
    return ()
}