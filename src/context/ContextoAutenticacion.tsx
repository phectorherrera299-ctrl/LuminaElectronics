import {createContext} from "react"

export type RolUsuario = "Invitado" | "Admin"
interface UsuarioSesion {
    nombre: string
    email: string
    rol: RolUsuario
}

interface TipoContextoAutenticacion {
    usuario: UsuarioSesion
    cambiarRol: (nuevoRol: RolUsuario) => void
    esAdmin: boolean
}

const ContextoAutenticacion= createContext<TipoContextoAutenticacion | undefined> (undefined)

const CLAVE_LOCALSTORAGE_AUTH = "lumina_auth"

const USUARIO_DEFECTO: UsuarioSesion = {
    nombre: "Invitado",
    email: "invitado@lumina.dev",
    rol: "Invitado"
}
