import axios from "axios";
import type { Producto } from "../types/Producto";

const URL_API = "https://dummyjson.com/products";

interface ProductoDummyJSON {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
}

const mapearCategoria = (categoriaApi: string): string => {
  const mapa: Record<string, string> = {
    laptops: "Computacion",
    smartphones: "Computacion",
    tablets: "Computacion",
    "mobile-accessories": "Accesorios",
    audio: "Audio",
  };
  return mapa[categoriaApi] || "Tecnologia";
};

