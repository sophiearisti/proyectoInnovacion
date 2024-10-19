import { Time } from "@angular/common";
import { Timestamp } from "firebase/firestore";

export class BazarLista {

    constructor(
        public idDoc: string,
        public nombre: string,
        public fechaInicio: Timestamp,
        public cupos: number,
        public codigo: string,
    ) { }
}