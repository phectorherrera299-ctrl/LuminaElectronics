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

export const obtenerProductosApi = async (): Promise<Producto[]> => {
  try {
    const respuestaLaptops = await axios.get<{ products: ProductoDummyJSON[] }>(
      `${URL_API}/category/laptops?limit=8`,
    );

    const respuestaSmartphones = await axios.get<{
      products: ProductoDummyJSON[];
    }>(`${URL_API}/category/smartphones?limit=8`);

    const respuestaAccesorios = await axios.get<{
      products: ProductoDummyJSON[];
    }>(`${URL_API}/category/mobile-accessories?limit=8`);

    const listaCruda = [
      ...respuestaLaptops.data.products,
      ...respuestaSmartphones.data.products,
      ...respuestaAccesorios.data.products,
    ];

    const productosTransformados: Producto[] = listaCruda.map((item) => ({
      id: `API-${item.id}`,
      nombre: item.title,
      precio: item.price,
      categoria: mapearCategoria(item.category),
      imagen: item.thumbnail,
      descripcion: item.description,
      stock: item.stock,
      descuento: item.discountPercentage
        ? Math.round(item.discountPercentage)
        : undefined,
      marca: item.brand || "Generico",
      calificacion: item.rating,
      destacado: (item.rating || 0) >= 4.5,
    }));
    return productosTransformados;
  } catch (error) {
    console.error("Error al obtener productos de la API:", error);
    return [];
  }
};
