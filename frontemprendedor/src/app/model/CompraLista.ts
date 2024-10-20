import { Timestamp } from "firebase/firestore";

export class CompraLista {

    constructor(
        public ID: string,
        public estado: string,
        public costo: string,
        public fecha: string,
        public nombreCliente: string,
    ) { }
}