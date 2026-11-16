export interface Producto{
    id: string,
    nombre: string,
    precio: number,
    categoria: string,
    imagen: string,
    descripcion: string,
    stock: number;
    destacado?: boolean,
    descuento?: number,
    marca?: string,
    calificacion?: number
}