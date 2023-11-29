import { BaseModel } from "./base.model";

export class Conta extends BaseModel {

    public idUsuario!: number;
    public chavePix!: string;
    public saldo!: number;
}