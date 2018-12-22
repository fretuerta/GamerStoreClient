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
  id: number;
  cantidad: number;
  precioVenta: number;
  precioAlquiler: number;
  juego_id: string;
  juego?: string;
  plataforma_id: string;
  plataforma?: string;
  formato: string;
}
