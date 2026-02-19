import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Pessoa {
  @PrimaryColumn()
  cpf: string;

  @Column()
  nome: string;

  @Column()
  endereco: string;

  @Column()
  telefone: string;

  @Column({ type: 'date' })
  dataNascimento: Date;

  @Column()
  escolaridade: string;
}
