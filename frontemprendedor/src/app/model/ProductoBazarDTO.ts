import { ProductoDTO } from "./ProductoDTO";

export class ProductoBazarDTO {

    constructor(
        public idProducto: string[],
        public precioEvento: number[],
        public cantidadEvento: number[],
        public producto: ProductoDTO,
    ) { }
}