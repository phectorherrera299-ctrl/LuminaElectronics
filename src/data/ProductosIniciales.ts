import type { Producto } from "../types/Producto"

export const productosIniciales: Producto[] = [
    {
    id: 'PRD-8941',
    nombre: 'Sony WH-1000XM5 Auriculares Inalámbricos',
    precio: 349.00,
    categoria: 'Audio',
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    descripcion: 'Cancelación de ruido líder en la industria con dos procesadores y ocho micrófonos para una claridad acústica superior.',
    stock: 14,
    destacado: true,
    descuento: 15,
    marca: 'Sony Electronics',
    calificacion: 4.9
  },
  {
    id: 'PRD-8942',
    nombre: 'MacBook Pro M3 14" Pulgadas',
    precio: 1999.00,
    categoria: 'Computación',
    imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    descripcion: 'Chip Apple M3 Pro con CPU de 11 núcleos y GPU de 14 núcleos, 18GB de memoria unificada y 512GB SSD.',
    stock: 8,
    destacado: true,
    marca: 'Apple Inc.',
    calificacion: 5.0
  },
  {
    id: 'PRD-8943',
    nombre: 'Logitech MX Master 3S',
    precio: 99.00,
    categoria: 'Accesorios',
    imagen: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80',
    descripcion: 'Sensor de 8K DPI silencioso para cualquier superficie con rueda electromagnética MagSpeed precisa.',
    stock: 25,
    destacado: true,
    marca: 'Logitech Master',
    calificacion: 4.8
  },
  {
    id: 'PRD-8944',
    nombre: 'Samsung UltraWide 34" Curvo',
    precio: 499.00,
    categoria: 'Monitores',
    imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
    descripcion: 'Curvatura 1000R profunda, resolución WQHD, tasa de refresco de 165Hz y soporte HDR10 para máxima inmersión.',
    stock: 6,
    destacado: false,
    descuento: 22,
    marca: 'Samsung Display',
    calificacion: 4.7
  },
  {
    id: 'PRD-8945',
    nombre: 'Keychron Q1 Pro Teclado Mecánico',
    precio: 199.00,
    categoria: 'Gaming',
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    descripcion: 'Chasis de aluminio mecanizado CNC, conectividad inalámbrica Bluetooth y switches mecánicos customizables.',
    stock: 12,
    destacado: true,
    marca: 'Keychron Studio',
    calificacion: 4.9
  },
  {
    id: 'PRD-8946',
    nombre: 'iPad Air 11" Chip M2',
    precio: 599.00,
    categoria: 'Computación',
    imagen: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
    descripcion: 'Pantalla Liquid Retina espectacular, potencia extrema con el chip M2 y compatibilidad con Apple Pencil Pro.',
    stock: 10,
    destacado: false,
    marca: 'Apple Inc.',
    calificacion: 4.8
  },
  {
    id: 'PRD-8947',
    nombre: 'Kindle Paperwhite 16GB',
    precio: 139.00,
    categoria: 'Accesorios',
    imagen: 'https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=800&q=80',
    descripcion: 'Pantalla de 6.8 pulgadas antirreflejo, luz cálida ajustable, semanas de batería y resistencia al agua IPX8.',
    stock: 2,
    destacado: false,
    marca: 'Amazon',
    calificacion: 4.0
  },
  {
    id: 'PRD-8948',
    nombre: 'Smart Light Bulb Hue E27',
    precio: 79.00,
    categoria: 'Hogar',
    imagen: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=800&q=80',
    descripcion: '16 millones de colores personalizables, control por voz y automatización integral del ecosistema inteligente.',
    stock: 30,
    destacado: false,
    marca: 'Philips Hue',
    calificacion: 4.6
    }
]