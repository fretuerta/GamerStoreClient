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
  caratula?: string;
}

export interface Articulo {
  id?: number;
  cantidad?: number;
  precioVenta?: number;
  precioAlquiler?: number;
  juego?: Juego;
  plataforma?: Plataforma;
  formato?: string;
  fechaCompra?: Date;
  fechaVenta?: Date;
}

export interface Alquiler {
  id: number;
  articulo?: Articulo;
  fechaInicio?: Date;
  fechaFin?: Date;
}
