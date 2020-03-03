package br.com.microsservico.repository_rest;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import br.com.microsservico.data.Filme;
import br.com.microsservico.projections.OnlyId;

@RepositoryRestResource(collectionResourceRel = "filmes", path = "filmes")
public interface RepositorioFilme extends MongoRepository<Filme, String>{
	
	@RestResource(path = "buscarPorCategoria")
	Page<Filme> findByCategorias(String categoria, Pageable pageable);
	
	@RestResource(path = "buscarPorMultiplasCategorias")
	Page<Filme> findByCategoriasIn(Set<String> categorias, Pageable pageable);		
	
}
