import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './pessoa.entity';

@Injectable()
export class PessoaService {
  constructor(
    @InjectRepository(Pessoa)
    private repo: Repository<Pessoa>,
  ) {}

  create(pessoa: Pessoa) {
    return this.repo.save(pessoa);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(cpf: string) {
    const pessoa = await this.repo.findOne({ where: { cpf } });
    if (!pessoa) throw new NotFoundException('Pessoa não encontrada');
    return pessoa;
  }

  async update(cpf: string, data: Partial<Pessoa>) {
    await this.findOne(cpf);
    await this.repo.update({ cpf }, data);
    return this.findOne(cpf);
  }

  async remove(cpf: string) {
    const pessoa = await this.findOne(cpf);
    await this.repo.delete({ cpf });
    return pessoa;
  }
}
