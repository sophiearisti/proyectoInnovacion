import { Variante } from './Variante';

export class ProductoDTO {

    constructor(
        public id_auth: string,
        public nombre: string,
        public imagen: string,
        public descripcion: string,
        public tags: string[],
        public precio: number,
        public codigo: string,
        public promocion: number,
        public variantes: Variante[],
    ) { }
}