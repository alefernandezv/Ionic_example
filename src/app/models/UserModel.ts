import { Type } from "@angular/core"

export class UserModel {

    constructor(
        public rut: string,
        public nombre: string,
        public apellido: string,
        public edad: number,
        public correo: string,
        public usuario: string,
        public password: string,
        public superuser: boolean
    ) {
    }

    //Metodo dentro de la clase para crear usuario. EJEMPLO solamente.
    static crearUsuario(event: {
        nombre: string,
        apellido: string,
        correo: string
    }){
        return {
            name: event.nombre,
            last_name: event.apellido,
            email: event.correo
        }
    }
}