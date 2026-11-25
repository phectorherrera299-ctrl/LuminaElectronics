import { useState } from "react";
import { useProductos } from "../context/ProductosContext";
import type { Producto } from "../types/Producto";

interface ModalProductoProps {
  abierto: boolean;
  alCerrar: () => void;
  productosAEditar?: Producto | null;
}

const CATEGORIAS_VALIDAS = [
  "Smartphones",
  "Laptops",
  "Audio",
  "Wearables",
  "Accesorios",
  "Fotografía",
];

export function ModalProducto({
    abierto,
    alCerrar,
    productoAEditar,
}: ModalProductoProps) {
    const {productos, agregarProducto, editarProducto} = useProductos()

    const [nombre, setNombre] = useState ("")
    const [precio, setPrecio] = useState<number | "">("")
    const [categoria, setCategoria] = useState(CATEGORIAS_VALIDAS[0])
    const [marca, setMarca] = useState("")
    const [stock, setStock] = useState<number | "">(0)
    const [descuento, setDescuento] = useState<number | "">(0)
    const [imagen, setImagen] = useState("")
    const [descripcion, setDescripcion] = useState ("")

    const [errorValidacion, setErrorValidacion] = useState<string | null> (null)

    const esModoEdicion = Boolean(productoAEditar)
}
