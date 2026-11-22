import {createContext, useContext, useEffect, useState } from "react";
import type { Producto } from "../types/Producto";
import type { ReactNode } from "react";
import { productosIniciales } from "../data/ProductosIniciales";
import { obtenerProductosApi } from "../services/ApiProductos";

interface TipoContextProductos {
  productos: Producto[];
  cargando: boolean
  agregarProducto: (producto: Producto) => void;
  editarProducto: (id: string, productoActualizado: Partial<Producto>) => void;
  eliminarProducto: (id: string) => void;
  obtenerProductoPorId: (id: string) => Producto | undefined;
}

const ContextoProductos = createContext<TipoContextProductos | undefined>(
  undefined,
);

const CLAVE_LOCALSTORAGE = "lumina_productos";

export const ProveedorProductos = ({ children }: { children: ReactNode }) => {
  const [cargando, setCargando] = useState(false)
  const [productos, setProductos] = useState<Producto[]>(() => {
    const datosGuardados = localStorage.getItem(CLAVE_LOCALSTORAGE);
    if (datosGuardados) {
      try {
        return JSON.parse(datosGuardados);
      } catch {
        return productosIniciales;
      }
    }
    return productosIniciales;
  });

  useEffect(() => {
    const sincronizarConApi = async () => {
      const datosGuardados = localStorage.getItem(CLAVE_LOCALSTORAGE)
      if (!datosGuardados || JSON.parse(datosGuardados).length <= productosIniciales.length){
        setCargando (true)
        const productosApi = await obtenerProductosApi()
        if (productosApi.length > 0){
          const listaCombinada = [...productosIniciales, ...productosApi]
          setProductos(listaCombinada)
          localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(listaCombinada))
        }
        setCargando(false)
      }
    }
    sincronizarConApi()
  }, [])
  
  useEffect(() =>{
    localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(productos))
  }, [productos])

  const agregarProducto = (nuevoProducto: Producto) => {
    setProductos((previos) => [nuevoProducto, ...previos])
  }

  const editarProducto = (id: string, productoActualizado: Partial<Producto>) =>{
    setProductos((previos) =>
        previos.map ((prod) => (prod.id === id ? {...prod, ...productoActualizado} : prod))
    )
  }

  const eliminarProducto = (id: string) => {
    setProductos((previos) => previos.filter((prod) => prod.id !== id))
  }

  const obtenerProductoPorId = (id: string) => {
     return productos.find((prod) => prod.id === id)
  }

  return (
    <ContextoProductos.Provider
        value={{
            productos,
            cargando,
            agregarProducto,
            editarProducto,
            eliminarProducto,
            obtenerProductoPorId
        }} 
    >
        {children}
    </ContextoProductos.Provider>
  )
}

export const useProductos = () => {
    const contexto = useContext(ContextoProductos)
    if (!contexto) {
        throw new Error ("useProductos debe usarse dentro de un ProveedorProductos")
    }
    return contexto
}