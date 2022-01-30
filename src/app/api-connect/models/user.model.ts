import { PersonaModel } from "./persona.model";

export class UserModel{

    public id: number | undefined;
    public userName: string | undefined;
    public email: string | undefined;
    public password: string | undefined;
    public rol: number | undefined;

    constructor(
        id?: number,
        userName?: string,
        email?: string,
        password?: string,
        rol?: number,
    ){
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }

}
  