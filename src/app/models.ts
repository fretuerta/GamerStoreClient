export interface AuthData {
  email?: string;
  password?: string;
  authenticated?: boolean;
}

export interface Cliente {
  id?: number;
  nombre: string;
  apellidos: string;
  dni: string;
  telefono: string;
  direccion: string;
  codPostal: number;
  poblacion: string;
  provincia: string;
}

export interface Plataforma {
  id?: number;
  nombre: string;
}

export interface Juego {
  id?: number;
  nombre?: string;
  codigo?: string;
  caratula?: string;
}

export interface Articulo {
  id?: number;
  cantDispAlquiler?: number;
  cantDispVenta?: number;
  precioVenta?: number;
  precioAlquiler?: number;
  codigo?: string;
  juego?: Juego;
  plataforma?: Plataforma;
  formato?: string;
  cantidad?: number;
}

export interface AlquilerDetalle {
  id?: number;
  articulo?: Articulo;
  cantidad?: number;
  precio?: number;
}

export interface Alquiler {
  id?: number;
  cliente?: Cliente;
  fechaInicio?: Date;
  fechaFin?: Date;
  total?: number;
  alquilerDetalles?: AlquilerDetalle[];
}

export interface VentaDetalle {
  id?: number;
  articulo?: Articulo;
  cantidad?: number;
  precio?: number;
}

export interface Venta {
  id?: number;
  cliente?: Cliente;
  fechaVenta?: Date;
  total?: number;
  ventaDetalles?: VentaDetalle[];
}

export interface FacturaDetalle {
  id?: number;
  articulo?: Articulo;
  cantidad?: number;
  precio?: number;
}

export interface Factura {
  numFactura?: string;
  cliente?: Cliente;
  fechaFactura?: Date;
  total?: number;
  facturaDetalles?: FacturaDetalle[];
}