package br.com.microsservico.repository_rest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import br.com.microsservico.data.Sala;

@RepositoryRestResource(collectionResourceRel = "salas", path = "salas")
public interface RepositorioSala extends MongoRepository<Sala, String> {
	
	@RestResource(path = "buscarPorIdCinema")
	public Page<Sala> findByIdCinema(String idCinema, Pageable pageable);
	
}
