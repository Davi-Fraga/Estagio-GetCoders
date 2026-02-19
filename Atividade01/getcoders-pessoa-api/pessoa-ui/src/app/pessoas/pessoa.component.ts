import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Pessoa } from './pessoa.model';
import { PessoaService } from './pessoa.service';

@Component({
  selector: 'app-pessoa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pessoa.component.html',
  styleUrl: './pessoa.component.css'
})
export class PessoaComponent implements OnInit {
  pessoas: Pessoa[] = [];
  carregando = false;
  erro = '';
  editingCpf: string | null = null;

  form = this.fb.group({
    cpf: ['', [Validators.required]],
    nome: ['', [Validators.required]],
    endereco: [''],
    telefone: [''],
    dataNascimento: [''],
    escolaridade: ['']
  });

  constructor(private fb: FormBuilder, private service: PessoaService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.erro = '';
    this.carregando = true;
    this.service
      .listar()
      .pipe(finalize(() => (this.carregando = false)))
      .subscribe({
        next: (pessoas) => (this.pessoas = pessoas),
        error: () => (this.erro = 'Falha ao carregar pessoas.')
      });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue() as Pessoa;
    this.erro = '';

    const request$ = this.editingCpf
      ? this.service.atualizar(this.editingCpf, { ...payload, cpf: this.editingCpf })
      : this.service.criar(payload);

    request$.subscribe({
      next: () => {
        this.resetForm();
        this.carregar();
      },
      error: () => (this.erro = 'Falha ao salvar pessoa.')
    });
  }

  editar(pessoa: Pessoa): void {
    this.editingCpf = pessoa.cpf;
    this.form.patchValue(pessoa);
    this.form.get('cpf')?.disable();
  }

  cancelarEdicao(): void {
    this.resetForm();
  }

  deletar(cpf: string): void {
    if (!confirm('Deseja realmente excluir?')) {
      return;
    }

    this.service.deletar(cpf).subscribe({
      next: () => this.carregar(),
      error: () => (this.erro = 'Falha ao excluir pessoa.')
    });
  }

  private resetForm(): void {
    this.form.reset();
    this.editingCpf = null;
    this.form.get('cpf')?.enable();
  }
}
