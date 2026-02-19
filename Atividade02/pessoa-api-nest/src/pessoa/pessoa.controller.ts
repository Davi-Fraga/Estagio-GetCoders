import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './pessoa.entity';

@Controller('pessoas')
export class PessoaController {
  constructor(private readonly service: PessoaService) {}

  // (igual ao plano)
  @Post()
  create(@Body() pessoa: Pessoa) {
    return this.service.create(pessoa);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.service.findOne(cpf);
  }

  @Patch(':cpf')
  update(@Param('cpf') cpf: string, @Body() data: Partial<Pessoa>) {
    return this.service.update(cpf, data);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.service.remove(cpf);
  }
}
