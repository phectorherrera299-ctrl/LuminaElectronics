import { useState } from "react"
import { useAutenticacion } from "../context/ContextoAutenticacion"

interface PropiedadesNavbar{
    cantidadDeseos?: number
    cantidadCarrito?: number
    seccionActiva?: string
    alNavegar?: (seccion: string) => void
}

export const Navbar = ({
    cantidadDeseos = 0,
    cantidadCarrito = 0,
    seccionActiva = "catalogo",
    alNavegar
}: PropiedadesNavbar) => {
    const {usuario, cambiarRol, esAdmin} = useAutenticacion()
    const [menuAbierto, setMenuAbierto] = useState(false)

    const manejarNavegacion = (seccion: string) => {
        if (alNavegar) alNavegar(seccion)
            setMenuAbierto(false)
    }
}