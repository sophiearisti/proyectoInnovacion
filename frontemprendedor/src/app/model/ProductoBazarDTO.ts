export class ProductoLista {

    constructor(
        public idEmpresa: string,
        public idBazar: string,
        public idProducto: string,
        public nombre: string,
        public urlImagen: string,
        public precioEvento: number,
        public cantidadEvento: number,
        public codigo: string,
    ) { }
}