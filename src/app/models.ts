export interface Plataforma {
  id?: number;
  _id?: string;
  nombre: string;
}

export interface Juego {
  id?: number;
  _id?: string;
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
