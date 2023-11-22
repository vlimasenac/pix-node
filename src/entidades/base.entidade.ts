import { PrimaryGeneratedColumn } from "typeorm";

export class BaseEntidade {

    @PrimaryGeneratedColumn()
    public id: number;
}