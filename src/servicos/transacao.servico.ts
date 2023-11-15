import { Transacao } from "src/entidades/transacao.entidade";

export class TransacaoServico {

    getTransacao(): Transacao[] {
        var trans = [
            new Transacao(new Date(2023, 10, 13, 19, 40), 1500, 1, 2, "27999995983", true),
            new Transacao(new Date(2023, 10, 13, 19, 40), 1500, 2, 1, "27998665982", false),
        ];

        return trans;
    }
}