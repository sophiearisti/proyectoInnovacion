
export class ProductoCompra {

    constructor(
        public idProducto: string,
        public posicion: number,
        public cantidad: number,
        public precio: number,
        public idEmpresa: string,
    ) { }
}