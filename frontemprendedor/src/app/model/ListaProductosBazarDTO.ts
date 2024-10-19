import { ProductoBazarDTO } from "./ProductoBazarDTO";

export class ListaProductosBazarDTO {

    constructor(
        public idEmpresa: string,
        public idBazar: string,
        public productos: ProductoBazarDTO[]
    ) { }
}