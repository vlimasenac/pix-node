import { BaseModel } from "./base.model";

export class Transacao extends BaseModel {
    
    public data!: Date;
    public valor!: number;
    public idUsuarioOrigem!: number;
    public chavePixDestino!: string;
    public sucesso!: boolean;
    public mensagemErro!: string;
  }