import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface TipoContextoDeseos {
  deseos: string[];
  alternarDeseo: (idProducto: string) => void;
  esDeseo: (idProducto: string) => boolean;
  cantidadDeseos: number;
}

const ContextoDeseos = createContext<TipoContextoDeseos | undefined>(undefined);

const CLAVE_LOCALSTORAGE_DESEOS = "lumina_deseos";

export const ProveedorDeseos = ({ children }: { children: ReactNode }) => {
  const [deseos, setDeseos] = useState<string[]>(() => {
    const guardados = localStorage.getItem(CLAVE_LOCALSTORAGE_DESEOS);
    if (guardados) {
      try {
        return JSON.parse(guardados);
      } catch {
        return [];
      }
    }
    return [];
  });
};
