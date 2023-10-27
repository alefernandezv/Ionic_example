import { Type } from "@angular/core"
import { TypeUser } from "./Type_user"
export class UserModel {

    constructor(
        public nombre: string,
        public apellido: string,
        public correo: string,
        public edad: number,
        public type: TypeUser,
        public usuario: string,
        public contrasenna: string,
        public id_carrera: number,
        public id_seccion: number,
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