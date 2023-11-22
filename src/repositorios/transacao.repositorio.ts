import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transacao } from "src/entidades/transacao.entidade";
import { Repository } from "typeorm";

@Injectable()
export class TransacaoRepositorio {

    constructor(@InjectRepository(Transacao) private transacaoRepository: Repository<Transacao>){

    }

    public getTransacoes(): Promise<Transacao[]> {
        return this.transacaoRepository.find();
    }

    public salvarTransacao(transacao: Transacao): Promise<Transacao>{

        return this.transacaoRepository.save(transacao);
    }
}