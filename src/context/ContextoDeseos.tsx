import { createContext, useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    localStorage.setItem(CLAVE_LOCALSTORAGE_DESEOS, JSON.stringify(deseos));
  }, [deseos]);

  const alternarDeseo = (idProducto: string) => {
    setDeseos((previos) =>
      previos.includes(idProducto)
        ? previos.filter((id) => id !== idProducto)
        : [...previos, idProducto],
    );
  };

  const esDeseo = (idProducto: string) => {
    return deseos.includes(idProducto);
  };

  return (
    <ContextoDeseos.Provider
      value={{
        deseos,
        alternarDeseo,
        esDeseo,
        cantidadDeseos: deseos.length,
      }}
    >
      {children}
    </ContextoDeseos.Provider>
  );
};

export const useDeseos = () => {
  const contexto = useContext(ContextoDeseos);
  if (!contexto) {
    throw new Error("useDeseos debe usarse dentro de un ProveedorDeseos");
  }
  return contexto;
};
