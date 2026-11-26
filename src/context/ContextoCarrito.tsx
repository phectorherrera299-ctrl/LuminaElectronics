import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface ItemCarrito {
  id: string;
  cantidad: number;
}
interface TipoContextoCarrito {
  carrito: ItemCarrito[];
  agregarAlCarrito: (idProducto: string, cantidad?: number) => void;
  eliminarDelCarrito: (idProducto: string) => void;
  vaciarCarrito: () => void;
  cantidadTotal: number;
}
const ContextoCarrito = createContext<TipoContextoCarrito | undefined>(undefined);
const CLAVE_LOCALSTORAGE_CARRITO = "lumina_carrito";
export const ProveedorCarrito = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<ItemCarrito[]>(() => {
    const guardados = localStorage.getItem(CLAVE_LOCALSTORAGE_CARRITO);
    if (guardados) {
      try {
        return JSON.parse(guardados);
      } catch {
        return [];
      }
    }
    return [];
  });