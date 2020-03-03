package br.com.microsservico.repository_rest;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import br.com.microsservico.data.Sala;

@RepositoryRestResource(collectionResourceRel = "salas", path = "salas")
public interface RepositorioSala extends MongoRepository<Sala, String> {

}
