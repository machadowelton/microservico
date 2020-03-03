package br.com.microsservico.repository_rest;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import br.com.microsservico.data.Cinema;

@RepositoryRestResource(collectionResourceRel = "cinemas", path = "cinemas")
public interface RepositorioCinema extends MongoRepository<Cinema, String> {

}
