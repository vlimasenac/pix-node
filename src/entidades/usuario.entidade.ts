export class Usuario {

    public id: number;
    public nome: string;
    public email: string;
    public senha: string;
    public chavePix: string;

    constructor(user: Partial<Usuario>){
        this.nome = user?.nome ?? '';
        this.email = user?.email ?? '';
        this.senha = user?.senha ?? '';
        this.id = user?.id ?? 0;
    }

    atualizar(nome: string, chavePix: string){
        this.nome = nome;
        this.chavePix = chavePix;
    }
}