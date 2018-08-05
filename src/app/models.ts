export interface Plataforma {
    id: number,
	nombre: string
}

export interface Juego {
    id: number,
	nombre: string,
    caratula: string;
}

export interface Articulo {
    id: number,
    cantidad: number,
	precioVenta: number,
	precioAlquiler: number,
    juegoId: number,
    juego?: string,
    plataformaId: number,
    plataforma?: string,
	formato: string
}