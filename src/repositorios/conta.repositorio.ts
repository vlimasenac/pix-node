import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Conta } from "src/entidades/conta.entidade";
import { Repository } from "typeorm";

@Injectable()
export class ContaRepositorio {
    
    constructor(@InjectRepository(Conta) private contaRepository: Repository<Conta>){

    }

    public getContas(): Promise<Conta[]> {
        return this.contaRepository.find();
    }

    public getContaPorChavePix(chavePix: string): Promise<Conta | undefined> {

        return this.contaRepository.findOneBy({ chavePix })
    }

    public getContaPorUsuario(idUsuario: number): Promise<Conta | undefined> {

        return this.contaRepository.findOneBy({ idUsuario })
    }

    public salvarConta(conta: Conta): Promise<Conta> {
        return this.contaRepository.save(conta);
    }
}