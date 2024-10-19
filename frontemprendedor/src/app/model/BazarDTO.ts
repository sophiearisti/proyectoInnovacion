export class BazarDTO {

    constructor(
        public nombre: string,
        public imagenMovil: string,
        public cantMax: number,
        public empresas: string[],
        public descripcion: string,
        public fechaInicio: Date,
        public fechaFin: Date,   
    ) { }
}