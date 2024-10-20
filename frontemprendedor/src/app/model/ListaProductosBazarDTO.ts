import { ProductoDTO } from "./ProductoDTO";


export class ListaProductosBazarDTO {

    constructor(
        public idEmpresa: string,
        public idBazar: string,
        public productos: ProductoDTO[]
    ) { }
}