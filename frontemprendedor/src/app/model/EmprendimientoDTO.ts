export class EmprendimientoDTO {
    constructor(
        public id_auth: string,
        public nombre: string,
        public imagen: string,
        public descripcion: string,
        public correo: string,
        public nombreusuario: string,
        public documento: number,
        public tags: string[],
    ) { }
}