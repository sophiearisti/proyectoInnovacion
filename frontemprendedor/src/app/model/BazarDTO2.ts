import { Timestamp } from "firebase/firestore";

export class BazarDTO2 {

    constructor(
        public nombre: string,
        public imagenMovil: string,
        public cantMax: number,
        public empresas: string[],
        public descripcion: string,
        public fechaInicio: Timestamp,
        public fechaFin: Timestamp,   
    ) { }
}