import { Timestamp } from "firebase/firestore";
import { ProductoCompra } from "./ProductoCompra";

export class Compra {

    constructor(
        public idCliente: string,
        public nombreCliente: string,
        public costoTotal: number,
        public fechaCompra: Timestamp,
        public estado: string,
        public productos: ProductoCompra[],
        public responsable: string,
        public datosAdicionales: string,
        public direccion: string
    ) { }
}