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
const ContextoCarrito = createContext<TipoContextoCarrito | undefined>(
  undefined,
);
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
  useEffect(() => {
    localStorage.setItem(CLAVE_LOCALSTORAGE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);
  const agregarAlCarrito = (idProducto: string, cantidad: number = 1) => {
    setCarrito((previos) => {
      const existe = previos.find((item) => item.id === idProducto);
      if (existe) {
        return previos.map((item) =>
          item.id === idProducto
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item,
        );
      }
      return [...previos, { id: idProducto, cantidad }];
    });
  };
  const eliminarDelCarrito = (idProducto: string) => {
    setCarrito((previos) => previos.filter((item) => item.id !== idProducto));
  };
  const vaciarCarrito = () => {
    setCarrito([]);
  };
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
};
