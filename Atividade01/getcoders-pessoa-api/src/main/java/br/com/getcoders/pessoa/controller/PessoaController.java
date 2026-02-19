package br.com.getcoders.pessoa.controller;

import br.com.getcoders.pessoa.entity.Pessoa;
import br.com.getcoders.pessoa.repository.PessoaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/pessoas")
@CrossOrigin(origins = "http://localhost:4200")
public class PessoaController {

    private final PessoaRepository repository;

    public PessoaController(PessoaRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Pessoa criar(@RequestBody Pessoa pessoa) {
        return repository.save(pessoa);
    }

    @GetMapping
    public List<Pessoa> listar() {
        return repository.findAll();
    }

    @GetMapping("/{cpf}")
    public Pessoa buscar(@PathVariable String cpf) {
        return repository.findById(cpf)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pessoa não encontrada"));
    }

    @PutMapping("/{cpf}")
    public Pessoa atualizar(@PathVariable String cpf, @RequestBody Pessoa pessoa) {
        if (!repository.existsById(cpf)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pessoa não encontrada");
        }
        pessoa.setCpf(cpf);
        return repository.save(pessoa);
    }

    @DeleteMapping("/{cpf}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable String cpf) {
        repository.deleteById(cpf);
    }
}
