package br.com.getcoders.pessoa.repository;

import br.com.getcoders.pessoa.entity.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaRepository extends JpaRepository<Pessoa, String> {}

